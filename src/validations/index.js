import ValidateUsers from './validateUsers';
import ValidateProperties from './validateProperties';
import ValidateFlags from './validateFlags';

const { signInValidation, signUpValidation } = ValidateUsers;
const {
  postPropertyValidation, updatePropertyValidation, getAPropertyValidation,
  getAllPropertyValidation, getPropertyTypesValidation,
  getDeletePropertyValidation, getDeletePropertyNotFoundValidation,
} = ValidateProperties;
const { flagPropertyValidation } = ValidateFlags;

export {
  signInValidation, signUpValidation,
  postPropertyValidation, updatePropertyValidation, getAPropertyValidation,
  getAllPropertyValidation, getPropertyTypesValidation, getDeletePropertyValidation,
  getDeletePropertyNotFoundValidation, flagPropertyValidation,
};
