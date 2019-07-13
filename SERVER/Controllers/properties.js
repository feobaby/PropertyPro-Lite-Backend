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

  static async markPropertySold(req, res) {
    const markPropertyQuery = 'SELECT * FROM Property WHERE property_id=$1';
    const { rows } = await db.query(markPropertyQuery, [req.params.property_id]);
    const token = Helper.generateToken(rows[0].property_id);
    const { property_id } = req.params;
    const {
      type, state, city, address, price, created_on, image_url,
    } = req.body;
    const values = {
      property_id,
      status: req.body.status = 'sold',
      type,
      state,
      city,
      address,
      price,
      created_on,
      image_url,
    };
    return res.status(200).json({
      status: 'success',
      token,
      data: values,
    });
  }

  static async deleteProperty(req, res) {
    const deleteQuery = 'DELETE FROM Property WHERE property_id=$1 returning *';
    const { rows } = await db.query(deleteQuery, [req.params.property_id]);
    if (!rows[0]) {
      return res.status(404)
        .json({
          status: 'error',
          error: 'Property not found!',
        });
    }
    /* istanbul ignore else */
    if (rows[0]) {
      return res.status(200).json({
        status: 200,
        data:
      {
        message: 'The property has been deleted!',
      },
      });
    }
  }
}

export default Propertycontroller;
