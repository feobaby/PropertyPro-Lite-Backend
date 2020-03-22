import moment from 'moment';
import db from '../config/index';
import {
  createPropertyQuery, updatePropertyQuery, selectPropertyQuery, markPropertyQuery,
  deletePropertyQuery, getAllPropertiesQuery, getOnePropertyQuery,
  getPropertyTypesQuery,
} from '../models/index';

/**
 * @class Propertycontroller
 * @description Controllers for Properties
 * @exports Propertycontroller
 */
class Propertycontroller {
  /**
   * @method postProperty
   * @description Method for posting a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async postProperty(req, res) {
    try {
      const { userId } = req.user;
      const values = [moment(new Date()), userId,
        req.body.status = 'Available', req.body.price, req.body.duration, req.body.state,
        req.body.city, req.body.address,
        req.body.type.toLowerCase(), req.body.imageUrl, req.body.ownerEmail];
      const { rows } = await db.query(createPropertyQuery, values);
      return res.status(201).json({
        status: '201',
        message: 'A new property has been created.',
        data: rows,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method updateProperty
   * @description Method for updating a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async updateProperty(req, res) {
    try {
      await db.query(updatePropertyQuery, [req.params.id]);
      const {
        duration, price, state, city, address, type, imageUrl,
      } = req.body;
      return res.status(200).json({
        status: '200',
        message: 'The property has been updated.',
        data: {
          duration, price, state, city, address, type, imageUrl,
        },
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method markPropertySold
   * @description Method for marking a property sold
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async markPropertySold(req, res) {
    try {
      const { userId } = req.user;
      await db.query(selectPropertyQuery, [req.params.id], userId);
      const { rows } = await db.query(markPropertyQuery, [req.body.status = 'sold',
        moment(new Date()), req.params.id]);
      const { id, status } = rows[0];
      if (rows[0].userid !== userId) {
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

  /**
   * @method deleteProperty
   * @description Method for deleting a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
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

  /**
   * @method getAllProperty
   * @description Method for getting all properties for a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async getAllProperty(req, res) {
    try {
      const { userId } = req.user;
      const { rows } = await db.query(getAllPropertiesQuery, [userId]);
      return res.status(200).json({
        status: '200',
        message: 'These are all your properties.',
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  /**
   * @method getAProperty
   * @description Method for getting a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async getAProperty(req, res) {
    try {
      const { userId } = req.user;
      const value = [req.params.id];
      const { rows } = await db.query(getOnePropertyQuery, value, userId);
      if (rows[0].userid !== userId) {
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

  /**
   * @method getPropertyTypes
   * @description Method for getting specific types of properties
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
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
