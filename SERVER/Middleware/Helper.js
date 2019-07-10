import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class Helper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(id) {
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY, { expiresIn: '7d' });
    return token;
  }
}

export default Helper;
