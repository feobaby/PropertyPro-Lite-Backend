import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const Helper = {
  generateToken(id) {
    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY, { expiresIn: '7d' });
    return token;
  },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
};

export default Helper;
