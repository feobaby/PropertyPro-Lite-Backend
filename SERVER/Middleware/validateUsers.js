import Helper from './Helper';
import db from '../DBconfig/index';
import { signinQuery } from '../Models/usersQuery';

const emailRegExp = /\S+@\S+\.\S+/;
const nameRegExp = /^[a-zA-Z]*$/;
const pnumRegExp = /^(\d{11})$/;
const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/;

class ValidateUsers {
  static signUpValidation(req, res, next) {
    const {
      email, first_name, last_name, password, phone_number, address,
    } = req.body;
    if (!email || !first_name || !last_name || !password || !phone_number
       || !address) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the required fields!',
        });
    }
    if (!email.match(emailRegExp)) {
      return res.status(400).json({
        status: '400',
        error: 'Please, supply a valid email!',
      });
    } if (!first_name.match(nameRegExp)
     || !last_name.match(nameRegExp)) {
      return res.status(400).json({
        status: '400',
        error: 'Please, supply valid name(s)!',
      });
    } if (!phone_number.match(pnumRegExp)) {
      return res.status(400).json({
        status: '400',
        error: 'Please, supply a valid phone number!',
      });
    } if (!password.match(passRegExp)) {
      return res.status(400).json({
        status: '400',
        error: 'Your password must be only 8 characters and must include at least an upper case letter, lower case letter, and a number.',
      });
    }
    next();
  }


  static async signIn(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: '400',
        error: 'No username or password!',
      });
    }
    const { rows } = await db.query(signinQuery, [req.body.email]);
    if (!rows[0]) {
      return res.status(401)
        .json({
          status: '401',
          error: 'Wrong email!',
        });
    } if (!Helper.comparePassword(rows[0].password, req.body.password)) {
      return res.status(401)
        .json({
          status: '401',
          error: 'Wrong password!',
        });
    }
    next();
  }
}


export default ValidateUsers;
