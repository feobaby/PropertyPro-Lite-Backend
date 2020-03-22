import { Helper } from '../utils/index';

const { verifyToken } = Helper;


/**
 * @class Auth
 * @description Controller for authentication
 * @exports Auth
 */
export default class Auth {
  /**
   * @method verifyToken
   * @description Method for authentication
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async verifyToken(req, res, next) {
    try {
      const { headers: { authorization } } = req;
      const token = authorization.split(' ')[1];
      if (!token || token === '') {
        return res.status(401).json({ status: '401', error: 'Access denied.' });
      }
      const decoded = await verifyToken(token);
      if (!(decoded && decoded.userId)) {
        return res.status(401).json({ status: '401', error: 'Access denied. We could not verify user' });
      }
      req.user = decoded;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: '401', error: 'Server error' });
    }
  }
}
