import { Router } from 'express';

import userRoute from './api/users';
import propertyRoute from './api/properties';
import flagRoute from './api/flags';

const router = new Router();

router.use('/auth', userRoute);
router.use('/', propertyRoute);
router.use('/', flagRoute);


export default router;
