class ValidateFlags {
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
