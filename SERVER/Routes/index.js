import express from 'express';

import users from '../Controllers/users';

// import Auth from '../Middleware/Authenticate';
import ValidateUsers from '../Middleware/validateUsers';

const router = express.Router();

// user to create an account
router.post('/api/v1/auth/signUp', ValidateUsers.signUp, users.signUp);
router.post('/api/v1/auth/signin', ValidateUsers.signIn, users.signIn);

export default router;
