import moment from 'moment';
import db from '../DBconfig/index';

class Flagcontroller {
  static async flagProperty(req, res) {
    const flagPropertyQuery = `INSERT INTO
      Flags (property_id, created_on, reason, description)
      VALUES($1, $2, $3, $4)
      returning *`;
    const {
      property_id, reason, description,
    } = req.body;
    const values = [
      property_id, moment(new Date()), reason, description,
    ];
    const { rows } = await db.query(flagPropertyQuery, values);
    return res.status(201).json({
      status: 'success',
      data: rows,
    });
  }
}

export default Flagcontroller;
