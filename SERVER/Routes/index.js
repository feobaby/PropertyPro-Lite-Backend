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
router.patch('/api/v1/auth/markproperty/:id', Auth.verifyToken, ValidateProperties.markPropertySold, Propertycontroller.markPropertySold);
router.delete('/api/v1/auth/deleteproperty/:id', Auth.verifyToken, ValidateProperties.deleteProperty, Propertycontroller.deleteProperty);
router.get('/api/v1/auth/allproperties', Auth.verifyToken, Propertycontroller.allproperties);
router.get('/api/v1/auth/property/:id', Auth.verifyToken, ValidateProperties.property, Propertycontroller.property);
router.get('/api/v1/auth/propertytype/:id', Auth.verifyToken, Propertycontroller.propertytype);
export default router;
