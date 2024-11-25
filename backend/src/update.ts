import {getPoll, updatePoll} from './persistence';
import type {CustomRequest} from './types';
import type {Response} from 'express';
import { verifyToken } from './auth';

const handleUpadte = async (
  req: CustomRequest<
    unknown,
    unknown,
    {code: string; question: string; options: string[]},
    unknown
  >,
  res: Response<{error: string} | {success: boolean}>,
) => {
  const {code, question, options} = req?.body;
  if (code === undefined) {
    res.status(400).json({error: 'Missing code'});
    return;
  }
  const token = req.token;
  if (!token) {
    res.status(401).json({error: 'Unauthorized'});
    return;
  }
  const tokenData = verifyToken(token) as { code: string };
  if(tokenData?.code !== code){
    res.status(403).json({error: 'Forbidden'});
    return;
  }
  const poll = await getPoll(code);
  if (!poll) {
    res.status(404).json({error: 'Poll not found'});
    return;
  }
  if(question){
    poll.question = question;
  }
  if(options){
    poll.options = options.map((text, index) => ({
      text,
      votes: poll.options[index]?.votes ?? 0,
    }));
  }
  await updatePoll(poll.code, poll);
  res.json({success: true});
};

export default handleUpadte;
