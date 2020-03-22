import moment from 'moment';
import { Helper } from '../../utils/index';

const { hashPassword } = Helper;
const hashedPassword = hashPassword('funmi12666666');
// eslint-disable-next-line import/prefer-default-export
export const createUserQuery = `INSERT INTO users
(
  email, firstname, lastname, password, phonenumber,
  address, registered
  ) 
VALUES
(
  'funmi10@gmail.com', 'Funmi', 'Olaiya', '${hashedPassword}', 
  '07000000000', 'No.4, no no no street.', '${moment(new Date())}'
)`;
