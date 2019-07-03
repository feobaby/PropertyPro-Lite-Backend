import Helper from '../Middleware/Helper';
import fields from '../Models/dbtables';

class Usercontroller {
  static signUp(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);
    req.body.password = hashPassword;
    const {
      email, firstName, lastName, password, phoneNumber,
    } = req.body;
    const account = {
      id: fields.User.length + 1,
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      isAdmin: 'false',
    };
    const token = Helper.generateToken(account.id);
    fields.User.push(account);
    return res.status(201)
      .json({
        status: '201',
        data:
        [{
          token,
          account,
        }],
      });
  }

  static signIn(req, res) {
    const user = fields.User.find(findemail => findemail.email === req.body.email);
    const token = Helper.generateToken(user.id);
    return res.status(200).json({
      status: '200',
      token,
      data: [{
        user,
      }],
    });
  }
}


export default Usercontroller;
