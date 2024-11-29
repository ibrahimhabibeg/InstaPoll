import type {Request, Response} from 'express';
import {Poll} from './types';
import {getPoll} from './persistence';

/**
 * Handle joining an existing poll
 * @param req.query.code The code of the poll
 * @returns The poll if found
 * @returns 404 if the poll is not found
 * @returns 400 if the code is missing
 */
const handleJoin = async (
  req: Request<undefined, undefined, undefined, {code: string}>,
  res: Response<{error: string} | Poll>,
) => {
  const code = req.query?.code;
  if (typeof code !== 'string') {
    res.status(400).send({error: 'Code is required'});
    return;
  }
  const poll = await getPoll(code);
  if (!poll) {
    res.status(404).send({error: 'Poll not found'});
    return;
  }
  res.json(poll);
};

export default handleJoin;
