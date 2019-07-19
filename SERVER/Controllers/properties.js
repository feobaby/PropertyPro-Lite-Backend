import moment from 'moment';
import db from '../DBconfig/index';

class Propertycontroller {
  static async postProperty(req, res) {
    const createPropertyQuery = `INSERT INTO
      Property (created_on, price, state, city, address, 
        type, image_url, owner_email)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const rows = await db.query(createPropertyQuery, [moment(new Date()),
      req.body.price, req.body.state, req.body.city, req.body.address,
      req.body.type.toLowerCase(), req.body.image_url, req.body.owner_email]);
    const {
      property_id, created_on, price, state, city, address, type, image_url, owner_email,
    } = rows.rows[0];
    const id = property_id;
    return res.status(201).json({
      status: 'success',
      data: {
        id, created_on, price, state, city, address, type, image_url, owner_email,
      },
    });
  }

  static async updateProperty(req, res) {
    const updatePropertyQuery = 'SELECT * FROM Property WHERE property_id=$1';
    // eslint-disable-next-line no-unused-vars
    const { rows } = await db.query(updatePropertyQuery, [req.params.property_id]);
    const {
      price, state, city, address, type, image_url,
    } = req.body;
    return res.status(200).json({
      status: 'success',
      data: {
        price,
        state,
        city,
        address,
        type,
        image_url,
      },
    });
  }

  static async markPropertySold(req, res) {
    const selectPropertyQuery = 'SELECT * FROM Property WHERE property_id=$1';
    const markPropertyQuery = `UPDATE Property
      SET status=$1, created_on=$2
      WHERE id=$3 returning *`;
    // eslint-disable-next-line no-unused-vars
    const rows = await db.query(selectPropertyQuery, [req.params.property_id]);
    const response = await db.query(markPropertyQuery, [req.body.status = 'sold',
      moment(new Date()), req.params.property_id]);
    const {
      property_id, status, created_on, price, state, city, address, type, image_url,
    } = response.rows[0];
    return res.status(200)
      .json({
        status: 'success',
        data: {
          property_id, status, created_on, price, state, city, address, type, image_url,
        },
      });
  }


  static async deleteProperty(req, res) {
    const deleteQuery = 'DELETE FROM Property WHERE property_id=$1 returning *';
    const { rows } = await db.query(deleteQuery, [req.params.property_id]);
    /* istanbul ignore else */ if (rows[0]) {
      return res.status(200).json({
        status: 200,
        data:
      {
        message: 'The property has been deleted!',
      },
      });
    }
  }

  static async getAllProperty(req, res) {
    const getall = 'SELECT * FROM Property';
    const { rows } = await db.query(getall);
    return res.status(200).json({
      status: 'success',
      data: rows,
    });
  }

  static async getAProperty(req, res) {
    const getone = 'SELECT * FROM Property WHERE property_id = $1';
    const { rows } = await db.query(getone, [req.params.property_id]);
    return res.status(200).json({
      status: 'success',
      data: rows,
    });
  }

  static async getPropertyTypes(req, res) {
    const getone = 'SELECT * FROM Property WHERE type = $1';
    const { rows } = await db.query(getone, [req.query.type]);
    return res.status(200).json({
      status: 'success',
      data: rows,
    });
  }
}

export default Propertycontroller;
