import moment from 'moment';
import Helper from '../Middleware/Helper';
import fields from '../Models/dbtables';

class Propertycontroller {
  static postProperty(req, res) {
    const propertydetails = {
      id: fields.User.length + 1,
      owner: req.body.owner,
      status: req.body.status,
      price: req.body.price,
      purpose: req.body.purpose,
      duration: req.body.duration,
      type: req.body.type,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
      state: req.body.state,
      city: req.body.city,
      address: req.body.address,
      createdOn: moment(new Date()),
      imageUrl: req.body.imageUrl,
    };
    const token = Helper.generateToken(propertydetails.id);
    fields.Property.push(propertydetails);
    return res.status(201)
      .json({
        status: '201',
        data:
        [{
          token,
          propertydetails,
        }],
      });
  }
}

export default Propertycontroller;
