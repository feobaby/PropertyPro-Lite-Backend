export const createPropertyQuery = `INSERT INTO
Property (created_on, user_id, status, price, duration, state, city, address, 
  type, image_url, owner_email)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *`;

export const updatePropertyQuery = 'SELECT * FROM Property WHERE id=$1';
export const getOnePropertyQuery = 'SELECT * FROM Property WHERE id = $1';

export const selectPropertyQuery = 'SELECT * FROM Property WHERE id=$1';
export const markPropertyQuery = `UPDATE Property
      SET status=$1, created_on=$2
      WHERE id=$3 returning *`;
export const deletePropertyQuery = 'DELETE FROM Property WHERE id=$1 returning *';
export const getAllPropertiesQuery = 'SELECT * FROM Property WHERE user_id=$1';
export const getPropertyTypesQuery = 'SELECT * FROM Property WHERE type = $1 AND state = $2 AND city = $3 AND price = $4 AND duration = $5';
