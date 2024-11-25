import type {Request, Response} from 'express';
import {Poll} from './types';
import {getPoll} from './persistence';

const handleJoin = async (
  req: Request<undefined, undefined, {code: string}, undefined>,
  res: Response<{error: string} | Poll>,
) => {
  if (!req.body?.code) {
    res.status(400).send({error: 'No code provided'});
    return;
  }
  const poll = await getPoll(req.body.code);
  if (!poll) {
    res.status(404).send({error: 'Poll not found'});
    return;
  }
  res.json(poll);
};

export default handleJoin;
