import express from 'express';
import Usercontroller from '../Controllers/users';
import Validateusers from '../Middleware/validateUsers';

const userRoute = express.Router();

userRoute.post('/signup',
  Validateusers.signUpDetails,
  Validateusers.signUpValidation,
  Usercontroller.signUp);

userRoute.post('/signin',
  Validateusers.signIn,
  Usercontroller.signIn);

export default userRoute;
