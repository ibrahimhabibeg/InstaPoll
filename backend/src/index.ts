import * as express from 'express';
import handleCreate from './create';
import * as bodyParser from 'body-parser';
import handleJoin from './join';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create', handleCreate);
app.get('/join', handleJoin);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
