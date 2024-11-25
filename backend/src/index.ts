import * as express from 'express';
import * as bodyParser from 'body-parser';
import handleCreate from './create';
import handleJoin from './join';
import handleVote from './vote';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create', handleCreate);
app.get('/join', handleJoin);
app.put('/vote', handleVote);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
