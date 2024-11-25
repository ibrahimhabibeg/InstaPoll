import * as express from 'express';
import * as bodyParser from 'body-parser';
import type {CustomRequest} from './types';
import handleCreate from './create';
import handleJoin from './join';
import handleVote from './vote';
import handleUpdate from './update';

const app = express();
const port = process.env.PORT || 3000;
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
