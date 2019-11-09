import express from 'express';
import morgan from 'morgan';
import router from './Routes/index';

const dotenv = require('dotenv');

dotenv.config();

const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'This route does not exist.',
  });
});


const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server running on port 5000');
  return server;
});


export default app;
