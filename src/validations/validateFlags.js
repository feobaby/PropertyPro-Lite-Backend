/**
 * @class ValidateFlags
 * @description Controllers for Flags validations
 * @exports ValidateFlags
 */
class ValidateFlags {
  /**
   * @method flagPropertyValidation
   * @description Method for validating the flagging of a property as fraudulent
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Object
   * @returns {object} response body object
   */
  static async flagPropertyValidation(req, res, next) {
    const { reason, description } = req.body;
    if (!reason || !description) {
      return res.status(400)
        .json({
          status: 'error',
          error: 'Please, supply the required fields!',
        });
    }
    return next();
  }
}

export default ValidateFlags;
