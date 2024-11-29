import type {Request, Response} from 'express';
import {isCodeUsed} from './persistence';

const handlePollExists = async (
  req: Request<unknown, unknown, unknown, {code: string}>,
  res: Response<{error: string} | {used: boolean}>,
) => {
  const code = req.query?.code;
  if (typeof code !== 'string') {
    res.status(400).send({error: 'Code is required'});
    return;
  }
  const used = await isCodeUsed(code);
  res.json({used});
};

export default handlePollExists;
