import db from '../DBconfig/index';

class ValidateProperties {
  static postProperty(req, res, next) {
    const {
      status, price, state, city, address, type, image_url,
    } = req.body;
    if (!status || !price || !state || !city || !address || !type || !image_url
    ) {
      return res.status(400)
        .json({
          status: 'error',
          error: 'Please, supply the required fields!',
        });
    }
    next();
  }


  static async updateProperty(req, res, next) {
    const updateQuery = 'SELECT * FROM Property WHERE property_id=$1';
    const { rows } = await db.query(updateQuery, [req.params.property_id]);
    if (!rows[0]) {
      return res.status(404)
        .json({
          status: 'error',
          error: 'Property not found!',
        });
    }
    return next();
  }
}

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
export default ValidateProperties;
