// import Helper from './Helper';
// import fields from '../Models/dbtables';

const emailRegExp = /\S+@\S+\.\S+/;
const nameRegExp = /^[a-zA-Z]*$/;
const pnumRegExp = /^[0-9]{11}$/;
const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/;


class Validateusers {
  static signUp(req, res, next) {
    if (!req.body.email) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply an email!',
        });
    } if (!req.body.first_name) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the first name!',
        });
    } if (!req.body.last_name) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the last name!',
        });
    } if (!req.body.password) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the password!',
        });
    } if (!req.body.phone_number) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the phone number!',
        });
    } if (!req.body.address) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the address!',
        });
    } if (!req.body.is_admin) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply this info!',
        });
    } if (!req.body.email.match(emailRegExp)) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply a valid email!',
        });
    } if (!req.body.first_name.match(nameRegExp)
     || !req.body.last_name.match(nameRegExp)) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply valid name(s)!',
        });
    } if (!req.body.phone_number.match(pnumRegExp)) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply a valid phone number!',
        });
    } if (!req.body.password.match(passRegExp)) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Your password must be only 8 characters and must include at least an upper case letter, lower case letter, and a number.',
        });
    }
    next();
  }
}

// static signIn(req, res, next) {
//   if (!req.body.email || !req.body.password) {
//     return res.status(400)
//       .json({
//         status: '400',
//         error: 'Please, supply all the information required!',
//       });
//   }
//   const user = fields.User.find(finduseremail => finduseremail.email === req.body.email);
//   if (!user) {
//     return res.status(401).json({
//       status: '401',
//       error: 'Wrong email!',
//     });
//   }
//   const { password } = req.body;
//   if (!Helper.comparePassword(user.password, password)) {
//     return res.status(401).json({
//       status: '401',
//       error: 'Wrong password!',
//     });
//   }
//   return next();
// }


export default Validateusers;
