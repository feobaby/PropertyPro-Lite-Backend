import express from 'express';

import Usercontroller from '../Controllers/users';
import Propertycontroller from '../Controllers/properties';
import Auth from '../Middleware/Authenticate';
import ValidateUsers from '../Middleware/validateUsers';
import ValidateProperties from '../Middleware/validateProperties';

const router = express.Router();

// user to create an account
router.post('/api/v1/auth/signUp', ValidateUsers.signUp, Usercontroller.signUp);
router.post('/api/v1/auth/signin', ValidateUsers.signIn, Usercontroller.signIn);
router.post('/api/v1/auth/postproperty', Auth.verifyToken, ValidateProperties.postproperty, Propertycontroller.postProperty);
router.patch('/api/v1/auth/updateproperty/:id', Auth.verifyToken, ValidateProperties.updateproperty, Propertycontroller.updateProperty);

export default router;
