class ValidateFlags {
  static async flagProperty(req, res, next) {
    const { property_id, reason, description } = req.body;
    if (!property_id || !reason || !description) {
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
