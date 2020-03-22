import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @class Helper
 * @description Controller for helpers
 * @exports Helper
 */
export class Helper {
  /**
   * @method hashPassword
   * @description Method for hashPassword
   * @param {object} password
   * @returns {object} response body object
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * @method comparePassword
   * @description Method for comparePassword
   * @param {object} hashPassword
   * @param {object} password
   * @returns {object} response body object
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @method generateToken
   * @description Method for generateToken
   * @param {object} id
   * @returns {object} response body object
   */
  static generateToken(id) {
    const token = jwt.sign({ userId: id }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }

  /**
   * @method verifyToken
   * @description Method for verifyToken
   * @param {object} token
   * @param {object} secret
   * @returns {object} response body object
   */
  static async verifyToken(token, secret = process.env.SECRET) {
    const decoded = await jwt.verify(token, secret);
    return decoded;
  }
}
