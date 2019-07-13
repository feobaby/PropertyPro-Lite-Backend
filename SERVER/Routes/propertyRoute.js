import express from 'express';
// eslint-disable-next-line import/no-named-as-default
import Propertycontroller from '../Controllers/properties';
import Auth from '../Middleware/Authenticate';
import ValidateProperties from '../Middleware/validateProperties';

const propertyRoute = express.Router();

propertyRoute.post('/property',
  Auth.verifyToken,
  ValidateProperties.postProperty,
  Propertycontroller.postProperty);

propertyRoute.patch('/property/:property_id',
  Auth.verifyToken,
  ValidateProperties.updateProperty,
  Propertycontroller.updateProperty);

propertyRoute.patch('/property/:property_id/sold',
  Auth.verifyToken,
  Propertycontroller.markPropertySold);

propertyRoute.delete('/property/:property_id',
  Auth.verifyToken,
  Propertycontroller.deleteProperty);

export default propertyRoute;
