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
    const user = fields.find(finduseremail => (finduseremail.email === req.body.email));
    if (!user) {
      return res.status(401).json({
        status: '401',
        error: 'Wrong email!',
      });
    }
    if (!Helper.comparePassword(user.password, req.body.password)) {
      return res.status(401).json({
        status: '401',
        error: 'Wrong password!',
      });
    }
    const token = Helper.generateToken(user.id);
    return res.status(200).json({
      status: '200',
      token,
      data:
      [{ user }],
    });
  }
}


export default Usercontroller;
