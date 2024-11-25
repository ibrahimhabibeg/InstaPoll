import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {createAdapter} from '@socket.io/redis-adapter';
import {Redis} from 'ioredis';
import type {CustomRequest, Poll} from './types';
import handleCreate from './create';
import handleJoin from './join';
import handleVote from './vote';
import handleUpdate from './update';
import handleConnection from './connection';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req: CustomRequest, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    req.token = authHeader.split(' ')[1];
  }
  next();
});

app.post('/create', handleCreate);
app.get('/join', handleJoin);
app.put('/vote', handleVote);
app.put('/update', handleUpdate);

const pubClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});
const subClient = pubClient.duplicate();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  adapter: createAdapter(pubClient, subClient),
  cors: {
    origin: '*',
  },
});

io.on('connection', async socket => {
  await handleConnection(socket);
});

export const notifyPollUpdate = (code: string, poll: Poll) => {
  io.to(code).emit('poll', poll);
};

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
