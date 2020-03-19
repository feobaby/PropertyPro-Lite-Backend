import Usercontroller from './users';
import Propertycontroller from './properties';
import Flagcontroller from './flags';

const { signUp, signIn } = Usercontroller;
const {
  postProperty, updateProperty, markPropertySold, getAProperty,
  getAllProperty, deleteProperty, getPropertyTypes,
} = Propertycontroller;
const { flagProperty } = Flagcontroller;

export {
  signUp, signIn, postProperty, updateProperty, markPropertySold, getAProperty,
  getAllProperty, deleteProperty, getPropertyTypes, flagProperty,
};
