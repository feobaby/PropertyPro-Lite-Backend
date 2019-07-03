class ValidateProperties {
  static postproperty(req, res, next) {
    if (!req.body.owner || !req.body.status || !req.body.price || !req.body.purpose
        || !req.body.duration || !req.body.type || !req.body.bedroom || !req.body.bathroom
        || !req.body.state || !req.body.city || !req.body.address
        || !req.body.createdOn || !req.body.imageUrl) {
      return res.status(400)
        .json({
          status: '400',
          error: 'Please, supply all the information required!',
        });
    }
    return next();
  }
}
export default ValidateProperties;
