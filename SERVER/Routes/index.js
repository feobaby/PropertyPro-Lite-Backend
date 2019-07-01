import express from 'express';

import users from '../Controllers/users';

import Auth from '../Middleware/Authenticate';
import ValidateUsers from '../Middleware/validateUsers';

const router = express.Router();

// user to create an account
router.post('/api/v1/auth/signUp', Auth.verifyToken, ValidateUsers.signUp, users.signUp);
router.post('/api/v1/auth/signin', users.signIn);

export default router;
