import moment from 'moment';
// eslint-disable-next-line import/prefer-default-export
export const createPropertyQuery = `INSERT INTO properties
(
  userid, status, price, duration, state, city, address, 
  type, createdon, imageurl, owneremail
  ) 
VALUES
(
  1, 'available', 'N90,000', 'yearly', 'Lagos', 'Lagos', 
  'No.4, no no no street, Lagos.', 'bungalow', '${moment(new Date())}', 'http://jjjjjjd.djjjjd.ddd','funmi10@gmail.com'
)`;
