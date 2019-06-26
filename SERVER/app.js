import express from 'express';
// import router from './Routes/index';
// eslint-disable-next-line linebreak-style
// const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(router);


const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server running on port 5000');
  return server;
});


export default app;
