// import fields from '../Models/dbtables';

// class ValidateProperties {
//   static postproperty(req, res, next) {
//     if (!req.body.owner || !req.body.status || !req.body.price || !req.body.purpose
//         || !req.body.duration || !req.body.type || !req.body.bedroom || !req.body.bathroom
//         || !req.body.state || !req.body.city || !req.body.address || !req.body.imageUrl) {
//       return res.status(400)
//         .json({
//           status: '400',
//           error: 'Please, supply all the information required!',
//         });
//     }
//     return next();
//   }

//   static updateproperty(req, res, next) {
//     const property = fields.Property.find(findid => findid.id === Number(req.params.id));
//     if (!property) {
//       res.status(404)
//         .json({
//           status: '404',
//           error: 'Please, this property can not be found',
//         });
//     }
//     if (!req.body.price || !req.body.status || !req.body.duration || !req.body.imageUrl) {
//       return res.status(400)
//         .json({
//           status: '400',
//           error: 'Please, supply all required fields',
//         });
//     }
//     return next();
//   }

//   static markPropertySold(req, res, next) {
//     const markproperty = fields.Property.find(findid => findid.id === Number(req.params.id));
//     if (!markproperty) {
//       res.status(404)
//         .json({
//           status: '404',
//           error: 'Please, this property can not be found',
//         });
//     }
//     if (!req.body.status) {
//       return res.status(400)
//         .json({
//           status: '400',
//           error: 'Please, supply the status',
//         });
//     }
//     return next();
//   }

//   static deleteProperty(req, res, next) {
//     const deleteProperty = fields.Property.find(findid => findid.id === Number(req.params.id));
//     if (!deleteProperty) {
//       res.status(404)
//         .json({
//           status: '404',
//           error: 'Please, this property can not be found',
//         });
//     }
//     return next();
//   }

//   static property(req, res, next) {
//     const property = fields.Property.find(findid => findid.id === Number(req.params.id));
//     if (!property) {
//       res.status(404)
//         .json({
//           status: '404',
//           error: 'Please, this property can not be found',
//         });
//     }
//     return next();
//   }
// }
// export default ValidateProperties;
