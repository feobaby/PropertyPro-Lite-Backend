import moment from 'moment';
import db from '../DBconfig/index';
import Helper from '../Middleware/Helper';
import { signupQuery, signinQuery } from '../Models/usersQuery';


class Usercontroller {
  static async signUp(req, res) {
    const {
      email, first_name, last_name, password, phone_number, address,
    } = req.body;
    const hashPassword = Helper.hashPassword(password);
    const values = [email, first_name, last_name, hashPassword, phone_number,
      address, moment(new Date())];
    try {
      const { rows } = await db.query(signupQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).json({ status: '201', data: { token, rows } });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({ status: 409, error: 'OOPS! This particular email has already been registered!' });
      }
    }
  }

  static async signIn(req, res) {
    try {
      const { rows } = await db.query(signinQuery, [req.body.email]);
      const token = Helper.generateToken(rows[0].id);
      return res.status(200)
        .json({
          data: {
            status: '200',
            token,
          },
        });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }
}
export default Usercontroller;
