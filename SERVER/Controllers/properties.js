import db from '../DBconfig/index';
import Helper from '../Middleware/Helper';

class Propertycontroller {
  static async postProperty(req, res) {
    const createPropertyQuery = `INSERT INTO
      Property (price, state, city, address, 
        type, image_url, owner_email)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const {
      price, state, city, address,
      type, image_url, owner_email,
    } = req.body;
    const values = [
      price, state, city, address,
      type, image_url, owner_email,
    ];
    const { rows } = await db.query(createPropertyQuery, values);
    const token = Helper.generateToken(rows[0].id);
    return res.status(201).json({ status: '201', data: { status: 'success', token, rows } });
  }

  static async updateProperty(req, res) {
    const findOneQuery = 'SELECT * FROM Property WHERE id=$1';
    const updateOneQuery = `UPDATE Property
      SET price=$1
      WHERE id=$2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'property not found' });
      }
      const values = [
        req.body.price || rows[0].price,
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).json(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
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
    const getone = 'SELECT * FROM Property WHERE id = $1';
    const { rows } = await db.query(getone, [req.params.id]);
    const token = Helper.generateToken(rows[0].id);
    return res.status(200).json({
      status: 'success',
      token,
      data: rows[0],
    });
  }
}

export default Propertycontroller;
