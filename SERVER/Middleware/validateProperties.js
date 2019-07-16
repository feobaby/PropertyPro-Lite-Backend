// import db from '../DBconfig/index';

// class ValidateProperties {
//   static postProperty(req, res, next) {
//     const {
//       price, state, city, address, type, image_url,
//     } = req.body;
//     if (!price || !state || !city || !address || !type || !image_url
//     ) {
//       return res.status(400)
//         .json({
//           status: 'error',
//           error: 'Please, supply the required fields!',
//         });
//     }
//     return next();
//   }

//   static async updateProperty(req, res, next) {
//     const {
//       price, state, city, address, type, image_url,
//     } = req.body;
//     if (!price || !state || !city || !address || !type || !image_url
//     ) {
//       return res.status(400)
//         .json({
//           status: 'error',
//           error: 'Please, supply the required fields!',
//         });
//     }
//     const updateQuery = 'SELECT * FROM Property WHERE property_id=$1';
//     const { rows } = await db.query(updateQuery, [req.params.property_id]);
//     if (!rows[0]) {
//       return res.status(404)
//         .json({
//           status: 'error',
//           error: 'Property not found!',
//         });
//     }

//     next();
//   }

//   static async getAProperty(req, res, next) {
//     const getone = 'SELECT * FROM Property WHERE property_id = $1';
//     const { rows } = await db.query(getone, [req.params.property_id]);
//     if (!rows[0]) {
//       return res.status(404)
//         .json({
//           status: 'error',
//           error: 'Property not found!',
//         });
//     }

//     next();
//   }
// }
// export default ValidateProperties;
