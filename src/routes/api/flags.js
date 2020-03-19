import express from 'express';
import { flagProperty } from '../../controllers/index';
import { flagPropertyValidation } from '../../validations/index';
import { verifyToken } from '../../middleware/index';

const router = express.Router();

router.post('/property/flag/:id', verifyToken, flagPropertyValidation, flagProperty);

export default router;
