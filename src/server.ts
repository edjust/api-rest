import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

const portConnection = 4000;

app.listen(portConnection, () => {
  console.log(`Server started on port ${portConnection}!`);
});
