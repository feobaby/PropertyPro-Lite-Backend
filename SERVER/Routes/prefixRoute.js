import express from 'express';
import userRoute from './userRoutes';

const router = express.Router();

router.use('/api/v1/auth', userRoute);

export default router;
