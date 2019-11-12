import moment from 'moment';
// import Helper from '../Middleware/Helper';
import db from '../DBconfig/index';
import {
  createPropertyQuery, updatePropertyQuery, selectPropertyQuery, markPropertyQuery,
  deletePropertyQuery, getAllPropertiesQuery, getOnePropertyQuery,
  getPropertyTypesQuery,
} from '../Models/propertiesQuery';


class Propertycontroller {
  static async postProperty(req, res) {
    try {
      const { user_id } = req.user;
      const values = [moment(new Date()), user_id,
        req.body.status = 'Available', req.body.price, req.body.duration, req.body.state,
        req.body.city, req.body.address,
        req.body.type.toLowerCase(), req.body.image_url, req.body.owner_email];
      const { rows } = await db.query(createPropertyQuery, values);
      return res.status(201).json({
        status: '201',
        message: 'A new property has been created.',
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  static async updateProperty(req, res) {
    try {
      await db.query(updatePropertyQuery, [req.params.id]);
      const {
        duration, price, state, city, address, type, image_url,
      } = req.body;
      return res.status(200).json({
        status: '200',
        message: 'The property has been updated.',
        data: {
          duration, price, state, city, address, type, image_url,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  static async markPropertySold(req, res) {
    try {
      const { user_id } = req.user;
      await db.query(selectPropertyQuery, [req.params.id], user_id);
      const { rows } = await db.query(markPropertyQuery, [req.body.status = 'sold',
        moment(new Date()), req.params.id]);
      const { id, status } = rows[0];
      if (rows[0].user_id !== user_id) {
        return res.status(422).json({ status: '422', error: 'Access Denied' });
      }
      return res.status(200)
        .json({
          status: '200',
          message: 'This property has been marked sold.',
          data: { id, status },
        });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }


  static async deleteProperty(req, res) {
    try {
      const { rows } = await db.query(deletePropertyQuery, [req.params.id]);
      if (rows[0]) {
        return res.status(200).json({
          status: 200,
          message: 'This property has been deleted.',
        });
      }
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  static async getAllProperty(req, res) {
    try {
      const { user_id } = req.user;
      const { rows } = await db.query(getAllPropertiesQuery, [user_id]);
      return res.status(200).json({
        status: '200',
        message: 'These are all your properties.',
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  static async getAProperty(req, res) {
    try {
      const { user_id } = req.user;
      const value = [req.params.id];
      const { rows } = await db.query(getOnePropertyQuery, value, user_id);
      if (rows[0].user_id !== user_id) {
        return res.status(422).json({ status: '422', error: 'Access Denied' });
      }
      return res.status(200).json({
        status: '200',
        message: 'Here is the property.',
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }


  static async getPropertyTypes(req, res) {
    try {
      const values = [req.query.type, req.query.state, req.query.city, req.query.price,
        req.query.duration];
      const { rows } = await db.query(getPropertyTypesQuery, values);
      return res.status(200).json({
        status: '200',
        message: 'These are all the properties that matches your specification.',
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }
}

export default Propertycontroller;
