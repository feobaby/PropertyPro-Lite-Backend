import moment from 'moment';
import db from '../config/index';
import { flagPropertyQuery } from '../models/index';

/**
 * @class Flagcontroller
 * @description Controllers for flags
 * @exports Flagcontroller
 */
class Flagcontroller {
  /**
   * @method flagProperty
   * @description Method for flagging a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async flagProperty(req, res) {
    try {
      const { id: propertyid } = req.params;
      const { userId } = req.user;
      const {
        reason, description, createdon,
      } = req.body;
      await db.query(flagPropertyQuery, [userId, propertyid, moment(new Date()),
        reason, description]);
      return res.status(201).json({
        status: '201',
        message: 'Here is the flagged property.',
        data: {
          userId, propertyid, reason, description, createdon,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }
}

export default Flagcontroller;
