import express from 'express';
import ValidateUsers from '../Middleware/validateUsers';
import Usercontroller from '../Controllers/users';
import Propertycontroller from '../Controllers/properties';
import Auth from '../Middleware/Authenticate';
import Flagcontroller from '../Controllers/flags';
// import ValidateProperties from '../Middleware/validateProperties';
import ValidateFlags from '../Middleware/validateFlags';

const router = express.Router();

// for welcome
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to PropertyPro-Lite' });
});

router.post('/api/v1/auth/signup',
  ValidateUsers.signUpDetails,
  Usercontroller.signUp);

router.post('/api/v1/auth/signin',
  ValidateUsers.signIn,
  Usercontroller.signIn);

router.post('/api/v1/property',
  Auth.verifyToken,
  Propertycontroller.postProperty);

router.patch('/api/v1/property/:property_id',
  Auth.verifyToken,
  Propertycontroller.updateProperty);

router.patch('/api/v1/property/:property_id/sold',
  Auth.verifyToken,
  Propertycontroller.markPropertySold);

router.delete('/api/v1/property/:property_id',
  Auth.verifyToken,
  Propertycontroller.deleteProperty);

router.get('/api/v1/property',
  Auth.verifyToken,
  Propertycontroller.getAllProperty);

router.get('/api/v1/property/:property_id',
  Auth.verifyToken,
  Propertycontroller.getAProperty);

router.post('/api/v1/property/flag',
  ValidateFlags.flagProperty,
  Flagcontroller.flagProperty);

router.patch('/api/v1/resetpassword/:user_id',
  Auth.verifyToken,
  ValidateUsers.resetPassword,
  Usercontroller.resetPassword);


export default router;
