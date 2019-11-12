import db from '../DBconfig/index';
import {
  updatePropertyQuery, getOnePropertyQuery, getAllPropertiesQuery, getPropertyTypesQuery,
} from '../Models/propertiesQuery';

class ValidateProperties {
  static postProperty(req, res, next) {
    const {
      price, duration, state, city, address, type, image_url, owner_email,
    } = req.body;
    if (!price || !duration || !state || !city || !address || !type || !image_url
      || !owner_email) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the required fields!',
        });
    }
    next();
  }

  static async updateProperty(req, res, next) {
    const {
      price, state, city, address, type, image_url,
    } = req.body;
    if (!price || !state || !city || !address || !type || !image_url
    ) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the required fields!',
        });
    }
    const { rows } = await db.query(updatePropertyQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404)
        .json({
          status: '404',
          error: 'Property not found!',
        });
    }
    next();
  }

  static async getAProperty(req, res, next) {
    const { user_id } = req.user;
    const { rows } = await db.query(getOnePropertyQuery, [req.params.id], user_id);
    if (!rows[0]) {
      return res.status(404)
        .json({
          status: '404',
          error: 'Property not found!',
        });
    }
    next();
  }

  static async getAllProperty(req, res, next) {
    const { user_id } = req.user;
    const { rows } = await db.query(getAllPropertiesQuery, [user_id]);
    if (rows.length <= 0) {
      return res.status(404)
        .json({
          status: 'error',
          error: 'No properties found!',
        });
    }
    next();
  }

  static async getPropertyTypes(req, res, next) {
    const values = [req.query.type, req.query.state, req.query.city, req.query.price,
      req.query.duration];
    const { rows } = await db.query(getPropertyTypesQuery, values);
    if (rows.length <= 0) {
      return res.status(404)
        .json({
          status: '404',
          error: 'No property matches your specification!',
        });
    }
    next();
  }

  static async getDeleteProperty(req, res, next) {
    const { user_id } = req.user;
    const { rows } = await db.query(getOnePropertyQuery, [req.params.id], user_id);
    if (rows[0].user_id !== user_id) {
      return res.status(422).json({ status: '422', error: 'Access Denied' });
    } if (!rows[0]) {
      return res.status(404)
        .json({
          status: '404',
          error: 'Property not found!',
        });
    }
    next();
  }

  static async getDeletePropertyNotFound(req, res, next) {
    const { rows } = await db.query(getOnePropertyQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404)
        .json({
          status: '404',
          error: 'Property not found!',
        });
    }
    next();
  }
}
export default ValidateProperties;
