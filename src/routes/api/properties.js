import express from 'express';
import {
  postPropertyValidation, updatePropertyValidation, getAPropertyValidation,
  getAllPropertyValidation, getPropertyTypesValidation, getDeletePropertyValidation,
  getDeletePropertyNotFoundValidation,
} from '../../validations/index';
import {
  postProperty, updateProperty, markPropertySold,
  deleteProperty, getAllProperty, getAProperty, getPropertyTypes,
} from '../../controllers/index';
import { verifyToken } from '../../middleware/index';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to PropertyPro-Lite [back-end]' });
});
router.post('/property', verifyToken, postPropertyValidation, postProperty);
router.patch('/property/:id', verifyToken, updatePropertyValidation, updateProperty);
router.patch('/property/:id/sold', verifyToken, getAPropertyValidation, markPropertySold);
router.delete('/property/:id', verifyToken, getDeletePropertyNotFoundValidation,
  getDeletePropertyValidation, deleteProperty);
router.get('/properties', verifyToken, getAllPropertyValidation, getAllProperty);
router.get('/property/:id', verifyToken, getAPropertyValidation, getAProperty);
router.get('/property/type/:id', verifyToken, getPropertyTypesValidation, getPropertyTypes);

export default router;
