const regularExpression = /\S+@\S+\.\S+/;
const regularExpression1 = /^[a-zA-Z]*$/;
const regularExpression2 = /^[0-9]{11}$/;
const regularExpression3 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/;
class ValidateUsers {
  static signUp(req, res, next) {
    if (!req.body.email || !req.body.firstName || !req.body.lastName
      || !req.body.password || !req.body.phoneNumber) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply all the information required!',
        });
    } if (!req.body.email.match(regularExpression)) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply a valid email!',
        });
    } if (!req.body.firstName.match(regularExpression1)
     || !req.body.lastName.match(regularExpression1)) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply valid names!',
        });
    } if (!req.body.phoneNumber.match(regularExpression2)) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply a valid phone number!',
        });
    } if (!req.body.password.match(regularExpression3)) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Your password must be only 8 characters and must include at least an upper case letter, lower case letter, and a number.',
        });
    }
    return next();
  }
}

export default ValidateUsers;