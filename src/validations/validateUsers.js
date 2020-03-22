import {
  Helper,
  emailRegExp, nameRegExp, pnumRegExp, passRegExp,
} from '../utils/index';
import db from '../config/index';
import { signinQuery } from '../models/usersQuery';

/**
 * @class ValidateUsers
 * @description Controllers for Users validations
 * @exports ValidateUsers
 */
class ValidateUsers {
  /**
   * @method signUpValidation
   * @description Method for validating the sign up of a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static signUpValidation(req, res, next) {
    const {
      email, firstName, lastName, password, phoneNumber, address,
    } = req.body;
    switch (true) {
      case (!email.match(emailRegExp)):
        return res.status(400).json({
          status: '400',
          error: 'Please, supply a valid email!',
        });
      case (!password.match(passRegExp)):
        return res.status(400).json({
          status: '400',
          error: 'Your password must be only 8 characters and must include at least an upper case letter, lower case letter, and a number.',
        });
      case (!phoneNumber.match(pnumRegExp)):
        return res.status(400).json({
          status: '400',
          error: 'Please, supply a valid phone number!',
        });
      case (!firstName.match(nameRegExp) || !lastName.match(nameRegExp)):
        return res.status(400).json({
          status: '400',
          error: 'Please, supply valid name(s)!',
        });
      case (!email || !firstName || !lastName || !password || !phoneNumber
           || !address):
        return res.status(400)
          .json({
            status: '400',
            error: 'Please, supply the required fields!',
          });
      default:
        next();
    }
  }

  /**
   * @method signInValidation
   * @description Method for validating the sign in of a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async signInValidation(req, res, next) {
    const { rows } = await db.query(signinQuery, [req.body.email]);
    switch (true) {
      case (!req.body.email || !req.body.password):
        return res.status(400).json({
          status: '400',
          error: 'No username or password!',
        });
      case (!rows[0]):
        return res.status(401)
          .json({
            status: '401',
            error: 'Wrong email!',
          });
      case (!Helper.comparePassword(rows[0].password, req.body.password)):
        return res.status(401)
          .json({
            status: '401',
            error: 'Wrong password!',
          });
      default:
        next();
    }
  }
}
export default ValidateUsers;
