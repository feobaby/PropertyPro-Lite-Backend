import Helper from './Helper';
import db from '../DBconfig/index';


class Validateusers {
  static signUpDetails(req, res, next) {
    const {
      email, first_name, last_name, password, phone_number, address,
    } = req.body;
    if (!email || !first_name || !last_name || !password || !phone_number
       || !address) {
      return res.status(400)
        .json({
          status: 'error',
          error: 'Please, supply the required fields!',
        });
    }
    return next();
  }

  static async signIn(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 'error',
        error: 'No username or password!',
      });
    }
    try {
      const validateSignInText = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(validateSignInText, [req.body.email]);
      if (!rows[0]) {
        return res.status(401)
          .json({
            status: 'error',
            error: 'Wrong email!',
          });
      } if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401)
          .json({
            status: 'error',
            error: 'Wrong password!',
          });
      }
    } catch (error) {
      // return res.status(400)
      //   .json(error);
    }
    return next();
  }
}


export default Validateusers;
