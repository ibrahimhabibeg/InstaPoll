import type {Request, Response} from 'express';
import {getPoll, updatePoll} from './persistence';

/**
 * Handle a vote request.
 * @param req The request.
 * @param req.body.code The code of the poll.
 * @param req.body.optionIndex The index of the option to vote for. zero-indexed.
 * @param res The response.
 */

const handleVote = async (
  req: Request<unknown, unknown, {code: string; optionIndex: number}>,
  res: Response<{error: string} | {success: boolean}>,
) => {
  const {code, optionIndex} = req?.body;
  if (code === undefined || optionIndex === undefined) {
    res.status(400).json({error: 'Invalid request'});
    return;
  }
  const poll = await getPoll(code);
  if (!poll) {
    res.status(404).json({error: 'Poll not found'});
    return;
  }
  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    res.status(400).json({error: 'Invalid option index'});
    return;
  }
  poll.options[optionIndex].votes++;
  await updatePoll(code, poll);
  res.json({success: true});
};

export default handleVote;
