import express from 'express';
import Propertycontroller from '../Controllers/properties';
import Auth from '../Middleware/Authenticate';
import ValidateProperties from '../Middleware/validateProperties';

const propertyRoute = express.Router();

propertyRoute.post('/property',
  Auth.verifyToken,
  ValidateProperties.postProperty,
  Propertycontroller.postProperty);

// propertyRoute.patch('/property/:property_id',
//   Auth.verifyToken,
//   ValidateProperties.postProperty,
//   Propertycontroller.updateProperty);

export default propertyRoute;
