import {CustomSocket} from './types';
import {getPoll} from './persistence';

const handleConnection = async (socket: CustomSocket) => {
  let {code} = socket.handshake.query;
  if (!code || typeof code !== 'string') {
    socket.disconnect();
  }
  code = code as string;
  const poll = await getPoll(code);
  if (!poll) {
    socket.disconnect();
  }
  socket.join(code);
  socket.code = code;
  socket.emit('poll', poll);

  socket.on('disconnect', () => {
    socket.leave(code);
  });
};

export default handleConnection;
