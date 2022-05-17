import express from 'express';
import 'dotenv/config';
import { routes } from './routes';

const app = express();

app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

const portConnection = 4000;

app.listen(portConnection, () => {
  console.log(`Server started on port ${portConnection}!`);
});
