import express from 'express';
import Validateusers from '../Middleware/validateUsers';
import Usercontroller from '../Controllers/users';
import Propertycontroller from '../Controllers/properties';
import Auth from '../Middleware/Authenticate';
// import ValidateProperties from '../Middleware/validateProperties';

const router = express.Router();

// for welcome
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to PropertyPro-Lite' });
});

router.post('/api/v1/auth/signup', Validateusers.signUpDetails, Usercontroller.signUp);
router.post('/api/v1/auth/signin', Validateusers.signIn, Usercontroller.signIn);

router.post('/api/v1/property', Auth.verifyToken, Propertycontroller.postProperty);
router.patch('/api/v1/property/:id', Auth.verifyToken, Propertycontroller.updateProperty);

router.patch('/api/v1/property/:property_id/sold', Auth.verifyToken, Propertycontroller.markPropertySold);
router.delete('/api/v1/property/:property_id', Auth.verifyToken, Propertycontroller.deleteProperty);
router.get('/api/v1/property', Auth.verifyToken, Propertycontroller.getAllProperty);
router.get('/api/v1/property/:id', Auth.verifyToken, Propertycontroller.getAProperty);

export default router;
