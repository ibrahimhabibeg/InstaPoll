import type {Request, Response} from 'express';
import {generatePollCode} from './utils';
import {createToken} from './auth';
import {savePoll} from './persistence';
import {POLL_VALID_DURATION_MS} from './config';
import {Poll} from './types';

const handleCreate = async (
  req: Request<
    unknown,
    unknown,
    | {
        question: string;
        options: string[];
      }
    | undefined,
    unknown
  >,
  res: Response<{code: string; token: string} | {error: string}>,
) => {
  const code = await generatePollCode();
  if (!req.body || !req.body.question || !req.body.options) {
    res.status(400).json({error: 'Missing question or options'});
    return;
  }
  const {question, options} = req.body;
  const poll: Poll = {
    code,
    question,
    options: options.map(text => ({text, votes: 0})),
  };
  await savePoll(poll);
  const token = createToken({code}, POLL_VALID_DURATION_MS);
  res.json({code, token});
};

export default handleCreate;
