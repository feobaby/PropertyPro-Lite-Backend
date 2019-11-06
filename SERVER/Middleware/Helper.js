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
    const token = jwt.sign({ user_id: id }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }

  static async verifyToken(token, secret = process.env.SECRET) {
    const decoded = await jwt.verify(token, secret);
    return decoded;
  }
}

export default Helper;
