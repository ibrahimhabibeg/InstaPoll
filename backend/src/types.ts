import type {Request} from 'express';
import type {Socket} from 'socket.io';

export type PollOption = {
  text: string;
  votes: number;
};

export type Poll = {
  code: string;
  question: string;
  options: PollOption[];
};

export interface CustomRequest<
  A = unknown,
  B = unknown,
  C = unknown,
  D = unknown,
> extends Request<A, B, C, D> {
  token?: string;
}

export interface CustomSocket extends Socket {
  code?: string;
}
