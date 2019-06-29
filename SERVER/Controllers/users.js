import usersTable from '../Models/usersTable'

class Usercontroller {
  static signUp(req, res) {
    const account = {
      id: usersTable.length + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      isAdmin: 'NO'
    };
    usersTable.push(account);
    return res.status(201)
      .json({
        status: '201',
        data: account,
      });
  }
}


export default Usercontroller;
