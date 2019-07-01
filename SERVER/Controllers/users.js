import Helper from '../Middleware/Helper';
import fields from '../Models/usersTable';

class Usercontroller {
  static signUp(req, res) {
    const {
      email, firstName, lastName, password, phoneNumber,
    } = req.body;
    const hashPassword = Helper.hashPassword(password);
    const account = [email, firstName, lastName, hashPassword, phoneNumber, 'NO'];
    const token = Helper.generateToken(account.id);
    fields.push(account);
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
    const user = fields.find(findemail => (findemail.email === req.body.email));
    const token = Helper.generateToken({ user });
    return res.status(200).json({
      status: '200',
      token,
      data:
      [{ user }],
    });
  }
}


export default Usercontroller;
