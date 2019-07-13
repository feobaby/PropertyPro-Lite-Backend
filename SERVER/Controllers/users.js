import moment from 'moment';
import db from '../DBconfig/index';
import Helper from '../Middleware/Helper';

class Usercontroller {
  static async signUp(req, res) {
    const createQuery = `INSERT INTO
      users (email, first_name, last_name, password, phone_number, address, is_admin, registered)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const {
      email, first_name, last_name, password, phone_number, address, is_admin,
    } = req.body;
    const hashPassword = Helper.hashPassword(password);
    const values = [email, first_name, last_name, hashPassword, phone_number,
      address, is_admin, moment(new Date())];
    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].user_id);
      const data = {
        token,
        rows,
      };
      return res.status(201).json({
        status: 'success',
        data,
      });
    } catch (error) {
      /* istanbul ignore else */
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({ status: 409, error: 'OOPS! This particular email has already been registered!' });
      }
    }
  }

  static async signIn(req, res) {
    const signintext = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(signintext, [req.body.email]);
    const {
      user_id, email, first_name, last_name, password, phone_number, address, is_admin, registered,
    } = rows[0];
    const token = Helper.generateToken(rows[0].user_id);
    return res.status(200).json({
      status: 'success',
      data: {
        token,
        user_id,
        email,
        first_name,
        last_name,
        password,
        phone_number,
        address,
        is_admin,
        registered,
      },
    });
  }
}

export default Usercontroller;
