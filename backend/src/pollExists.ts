import type {Request, Response} from 'express';
import {isCodeUsed} from './persistence';

/**
 * Handle checking if a poll exists
 * @param req.query.code The code of the poll
 * @returns Whether the poll exists
 * @returns 400 if the code is missing
 */
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
