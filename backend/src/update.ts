import {getPoll, updatePoll} from './persistence';
import type {CustomRequest} from './types';
import type {Response} from 'express';
import { verifyToken } from './auth';
import { notifyPollUpdate } from '.';

/**
 * Handle updating a poll
 * @param req.body.code The code of the poll
 * @param req.body.question The question of the poll
 * @param req.body.options The options of the poll
 * @returns 400 if the code is missing
 * @returns 401 if the request is unauthorized
 * @returns 403 if the request is forbidden
 * @returns 404 if the poll is not found
 */
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
  notifyPollUpdate(code, poll);
};

export default handleUpadte;
