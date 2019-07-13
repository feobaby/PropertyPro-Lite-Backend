import express from 'express';
import userRoute from './userRoutes';
import propertyRoute from './propertyRoute';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to PropertyPro-Lite' });
});
router.use('/api/v1/auth', userRoute);
router.use('/api/v1', propertyRoute);

export default router;
