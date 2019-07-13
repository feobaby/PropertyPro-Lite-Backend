import express from 'express';
import userRoute from './userRoutes';
import propertyRoute from './propertyRoute';

const router = express.Router();

router.use('/api/v1/auth', userRoute);
router.use('/api/v1', propertyRoute);

export default router;
