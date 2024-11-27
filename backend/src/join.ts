import type {Request, Response} from 'express';
import {Poll} from './types';
import {getPoll} from './persistence';

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
