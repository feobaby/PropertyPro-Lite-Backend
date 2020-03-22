import db from '../config/index';
import {
  updatePropertyQuery, getOnePropertyQuery, getAllPropertiesQuery, getPropertyTypesQuery,
} from '../models/propertiesQuery';

/**
 * @class ValidateProperties
 * @description Controllers for Properties validations
 * @exports ValidateProperties
 */
class ValidateProperties {
  /**
   * @method postPropertyValidation
   * @description Method for validating the posting of a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static postPropertyValidation(req, res, next) {
    const {
      price, duration, state, city, address, type, imageUrl, ownerEmail,
    } = req.body;
    if (!price || !duration || !state || !city || !address || !type || !imageUrl
      || !ownerEmail) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply the required fields!',
        });
    }
    next();
  }

  /**
   * @method updatePropertyValidation
   * @description Method for validating the update of a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async updatePropertyValidation(req, res, next) {
    const {
      price, state, city, address, type, imageUrl,
    } = req.body;
    if (!price || !state || !city || !address || !type || !imageUrl
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

  /**
   * @method getAPropertyValidation
   * @description Method for validating the getting of a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async getAPropertyValidation(req, res, next) {
    const { userid } = req.user;
    const { rows } = await db.query(getOnePropertyQuery, [req.params.id], userid);
    if (!rows[0]) {
      return res.status(404)
        .json({
          status: '404',
          error: 'Property not found!',
        });
    }
    next();
  }

  /**
   * @method getAllPropertyValidation
   * @description Method for validating the getting(all) of a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async getAllPropertyValidation(req, res, next) {
    const { userId } = req.user;
    const { rows } = await db.query(getAllPropertiesQuery, [userId]);
    if (rows.length <= 0) {
      return res.status(404)
        .json({
          status: 'error',
          error: 'No properties found!',
        });
    }
    next();
  }

  /**
   * @method getPropertyTypesValidation
   * @description Method for validating the getting(specific types) of a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async getPropertyTypesValidation(req, res, next) {
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

  /**
   * @method getDeletePropertyValidation
   * @description Method for validating the delete of a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async getDeletePropertyValidation(req, res, next) {
    const { userId } = req.user;
    const { rows } = await db.query(getOnePropertyQuery, [req.params.id], userId);
    if (rows[0].userid !== userId) {
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

  /**
   * @method getDeletePropertyNotFoundValidation
   * @description Method for validating the delete of a property
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async getDeletePropertyNotFoundValidation(req, res, next) {
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
