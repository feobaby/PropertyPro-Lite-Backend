import express from 'express';
import { config } from 'dotenv';
import router from './routes';

config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/', router);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'This route does not exist.',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on localhost:${port}`));


export default app;
