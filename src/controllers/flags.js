import moment from 'moment';
import db from '../config/index';
import { flagPropertyQuery } from '../models/index';


class Flagcontroller {
  static async flagProperty(req, res) {
    try {
      const { id: property_id } = req.params;
      const { user_id } = req.user;
      const {
        reason, description, created_on,
      } = req.body;
      await db.query(flagPropertyQuery, [user_id, property_id, moment(new Date()),
        reason, description]);
      return res.status(201).json({
        status: '201',
        message: 'Here is the flagged property.',
        data: {
          user_id, property_id, reason, description, created_on,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }
}

export default Flagcontroller;
