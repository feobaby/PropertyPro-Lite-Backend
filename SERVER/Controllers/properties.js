import db from '../DBconfig/index';
import Helper from '../Middleware/Helper';

class Propertycontroller {
  static async postProperty(req, res) {
    const createPropertyQuery = `INSERT INTO
      Property (price, state, city, address, 
        type, image_url, owner_email)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.price, req.body.state, req.body.city, req.body.address,
      req.body.type, req.body.image_url, req.body.owner_email,
    ];
    const { rows } = await db.query(createPropertyQuery, values);
    return res.status(201).json({
      status: '201',
      data: {
        rows,
      },
    });
  }

  static async updateProperty(req, res) {
    const updatePropertyQuery = 'SELECT * FROM Property WHERE property_id=$1';
    const { rows } = await db.query(updatePropertyQuery, [req.params.id]);
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
    /* istanbul ignore else */
    if (!rows[0]) {
      res.status(404)
        .json({
          status: 'error',
          error: 'Property not found!',
        });
    } else if (rows[0]) {
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
    const { rows, rowCount } = await db.query(getall);
    const token = Helper.generateToken(rows[0].property_id);
    return res.status(200).json({
      status: 'success',
      token,
      data: rows,
      rowCount,
    });
  }

  static async getAProperty(req, res) {
    const { id } = req.params;
    const getone = 'SELECT * FROM Property WHERE id = $1';
    const { rows } = await db.query(getone, [req.params.id]);
    const token = Helper.generateToken(rows[0].id);
    return res.status(200).json({
      status: 'success',
      token,
      data: { id, rows },
    });
  }
}

export default Propertycontroller;
