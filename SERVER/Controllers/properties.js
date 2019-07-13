import moment from 'moment';
import db from '../DBconfig/index';
import Helper from '../Middleware/Helper';

class Propertycontroller {
  static async postProperty(req, res) {
    const createPropertyQuery = `INSERT INTO
      Property (owner, status, price, state, city, address, 
        type, created_on, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const {
      owner, status, price, state, city, address,
      type, image_url,
    } = req.body;
    const values = [
      owner, status, price, state, city, address,
      type, moment(new Date()), image_url,
    ];
    const { rows } = await db.query(createPropertyQuery, values);
    const token = Helper.generateToken(rows[0].property_id);
    return res.status(201).json({ status: 'success', token, data: rows[0] });
  }

  static async updateProperty(req, res) {
    const updatePropertyQuery = 'SELECT * FROM Property WHERE property_id=$1';
    const { rows } = await db.query(updatePropertyQuery, [req.params.property_id]);
    const token = Helper.generateToken(rows[0].property_id);
    const values = {
      status: req.body.status,
      price: req.body.price,
      state: req.body.state,
      city: req.body.city,
      address: req.body.address,
      type: req.body.type,
      image_url: req.body.image_url,
    };
    return res.status(200).json({
      status: 'success',
      token,
      data: values,
    });
  }
}

export default Propertycontroller;
