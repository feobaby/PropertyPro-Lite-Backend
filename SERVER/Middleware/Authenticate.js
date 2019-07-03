import jwt from 'jsonwebtoken';

class Auth {
  // eslint-disable-next-line consistent-return
  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: '400',
        error: 'Token is not provided',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const rows = [decoded.userId];
      if (!rows) {
        return res.status(400).json({
          data:
          [{
            name: 'JsonWebTokenError',
            message: 'invalid token',
          }],
        });
      }
      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;
