// eslint-disable-next-line import/prefer-default-export
export const flagPropertyQuery = `INSERT INTO
flags (userid, propertyid, createdon, reason, description)
VALUES($1, $2, $3, $4, $5)
returning *`;
