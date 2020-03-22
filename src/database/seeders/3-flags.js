import moment from 'moment';
// eslint-disable-next-line import/prefer-default-export
export const createFlagQuery = `INSERT INTO flags
(
  userid, propertyid, createdon, reason, description
  ) 
VALUES
(
  1, 1, '${moment(new Date())}', 'Fraud', 'The house has been sold earlier to another client.'
)`;
