import express from 'express';
import Usercontroller from '../Controllers/users';
import Validateusers from '../Middleware/validateUsers';

const userRoute = express.Router();

userRoute.post('/signup',
  Validateusers.signUp,
  Usercontroller.signUp);

export default userRoute;
