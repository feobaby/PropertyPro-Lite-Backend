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

  static updateProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    let recordFound;
    let itemIndex;
    fields.Property.find((record, index) => {
      if (record.id === id) {
        recordFound = record;
        itemIndex = index;
      }
    });
    const updateProperty = {
      id: recordFound.id,
      price: req.body.price || recordFound.price,
      status: req.body.status || recordFound.status,
      duration: req.body.duration || recordFound.duration,
      imageUrl: req.body.imageUrl || recordFound.imageUrl,
    };
    const token = Helper.generateToken(updateProperty.id);
    fields.Property.splice(itemIndex, 1, updateProperty);
    return res.status(200)
      .json({
        status: '200',
        data: [{
          token,
          updateProperty,
        }],
      });
  }

  static markPropertySold(req, res) {
    let markProperty = fields.Property.find(findid => findid.id === Number(req.params.id));
    markProperty = {
      status: req.body.status || recordFound.status,
    };
    const token = Helper.generateToken(markProperty.id);
    return res.status(200)
      .json({
        status: '200',
        data: [{
          token,
          markProperty,
        }],
      });
  }

  static deleteProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    fields.Property.find((record, index) => {
      if (record.id === id) {
        fields.Property.splice(index, 1);
        return res.status(200)
          .json({
            status: '200',
            data: [{
              message: 'Your property advert is deleted successfully',
            }],
          });
      }
    });
  }
}

export default Propertycontroller;
