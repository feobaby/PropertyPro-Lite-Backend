import express from 'express';
import { signUp, signIn } from '../../controllers/index';
import { signInValidation, signUpValidation } from '../../validations/index';

const router = express.Router();

router.post('/signup', signUpValidation, signUp);
router.post('/signin', signInValidation, signIn);

export default router;
