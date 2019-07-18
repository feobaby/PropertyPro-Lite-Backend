import db from '../DBconfig/index';
import Helper from '../Middleware/Helper';

const nodemailer = require('nodemailer');


class Usercontroller {
  static async signUp(req, res) {
    const createQuery = `INSERT INTO
      users (email, first_name, last_name, password, phone_number, address)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const {
      email, first_name, last_name, password, phone_number, address,
    } = req.body;
    const hashPassword = Helper.hashPassword(password);
    const values = [email, first_name, last_name, hashPassword, phone_number,
      address];
    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).json({ status: 'success', data: { token, rows } });
    } catch (error) {
      /* istanbul ignore else */ if (error.routine === '_bt_check_unique') {
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
    const token = Helper.generateToken(rows[0].id);
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

  static async resetPassword(req, res) {
    const output = `
    <p><h2>Hello!</h2>
    <h4>Your password has been successfully reset.</h4>
    <h6>Regards,<br>
    PropertyPro-Lite Team.<br>
    <a href = "https://propertypro-lite26.herokuapp.com">Our help center.</a></h6>
    </p>
    `;
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'dummy1633@gmail.com', // generated ethereal user
        pass: 'dummy.Email8', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // setup email data with unicode symbols
    const mailOptions = {
      from: '"PropertyPro-Lite Password Reset" <dummy1633@gmail.com>', // sender address
      to: ` ${req.body.email}`, // list of receivers
      subject: 'Reset password', // Subject line
      html: output, // html body
    };
    // send mail with defined transport object
    /* istanbul ignore next */transporter.sendMail(mailOptions, (error, info) => {
      /* istanbul ignore next */
      if (error) {
        return console.log(error);
      }
      /* istanbul ignore next */ console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      /* istanbul ignore next */console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    const findQuery = 'SELECT * FROM users WHERE user_id=$1';
    const resetQuery = `UPDATE users
      SET password=$1
      WHERE user_id=$2 returning *`;
    // eslint-disable-next-line no-unused-vars
    const rows = await db.query(findQuery, [req.params.user_id]);
    const {
      password, confirmPassword,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        error: 'Passwords do not match!',
      });
    }
    const hashPassword = Helper.hashPassword(password);
    const values = [
      hashPassword, req.params.user_id,
    ];
    const response = await db.query(resetQuery, values);
    return res.status(204).json(response.rows[0]);
  }
}
export default Usercontroller;
