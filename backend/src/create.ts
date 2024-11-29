import type {Request, Response} from 'express';
import {generatePollCode} from './utils';
import {createToken} from './auth';
import {savePoll} from './persistence';
import {POLL_VALID_DURATION_MS} from './config';
import {Poll} from './types';

/**
 * Handle the creation of a new poll
 * @param req.body.question The question of the poll
 * @param req.body.options The options of the poll
 * @returns The code and token of the created poll
 * @returns 400 if the question or options are missing
 */
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
  if (
    !req.body ||
    req.body.question === undefined ||
    req.body.options === undefined
  ) {
    res.status(400).json({error: 'Missing question or options'});
    return;
  }
  const code = await generatePollCode();
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
