// eslint-disable-next-line import/prefer-default-export
export const flagPropertyQuery = `INSERT INTO
Flags (user_id, property_id, created_on, reason, description)
VALUES($1, $2, $3, $4, $5)
returning *`;
