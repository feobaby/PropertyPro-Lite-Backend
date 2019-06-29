import express from 'express';

import users from '../controllers/users';

import ValidateUsers from '../Middleware/validateUsers';

const router = express.Router();

// user to create an account
router.post('/api/v1/auth/signup', ValidateUsers.signUp, users.signUp);

export default router;

