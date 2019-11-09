import express from 'express';
import ValidateUsers from '../Middleware/validateUsers';
import Usercontroller from '../Controllers/users';
import Propertycontroller from '../Controllers/properties';
import Auth from '../Middleware/Authenticate';
import Flagcontroller from '../Controllers/flags';
import ValidateProperties from '../Middleware/validateProperties';
import ValidateFlags from '../Middleware/validateFlags';

const router = express.Router();

const { verifyToken } = Auth;

// the welcome page
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to PropertyPro-Lite [back-end]' });
});

router.post('/api/v1/auth/signup',
  ValidateUsers.signUpValidation,
  Usercontroller.signUp);

router.post('/api/v1/auth/signin',
  ValidateUsers.signIn,
  Usercontroller.signIn);

router.post('/api/v1/post-property',
  verifyToken,
  ValidateProperties.postProperty,
  Propertycontroller.postProperty);

router.patch('/api/v1/update-property/:id',
  verifyToken,
  ValidateProperties.updateProperty,
  Propertycontroller.updateProperty);

router.patch('/api/v1/mark-property/:id/sold',
  verifyToken,
  ValidateProperties.getAProperty,
  Propertycontroller.markPropertySold);

router.delete('/api/v1/delete-property/:id',
  verifyToken,
  ValidateProperties.getDeletePropertyNotFound,
  ValidateProperties.getDeleteProperty,
  Propertycontroller.deleteProperty);

router.get('/api/v1/all-properties',
  verifyToken,
  ValidateProperties.getAllProperty,
  Propertycontroller.getAllProperty);

router.get('/api/v1/one-property/:id',
  verifyToken,
  ValidateProperties.getAProperty,
  Propertycontroller.getAProperty);


router.get('/api/v1/property/type/:id',
  verifyToken,
  ValidateProperties.getPropertyTypes,
  Propertycontroller.getPropertyTypes);


router.post('/api/v1/property/flag/:id',
  verifyToken,
  ValidateFlags.flagProperty,
  Flagcontroller.flagProperty);


export default router;
