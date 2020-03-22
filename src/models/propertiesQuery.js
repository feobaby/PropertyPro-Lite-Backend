export const createPropertyQuery = `INSERT INTO
properties (createdon, userid, status, price, duration, state, city, address, 
  type, imageurl, owneremail)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *`;

export const updatePropertyQuery = 'SELECT * FROM properties WHERE id=$1';
export const getOnePropertyQuery = 'SELECT * FROM properties WHERE id = $1';

export const selectPropertyQuery = 'SELECT * FROM properties WHERE id=$1';
export const markPropertyQuery = `UPDATE properties
      SET status=$1, createdon=$2
      WHERE id=$3 returning *`;
export const deletePropertyQuery = 'DELETE FROM properties WHERE id=$1 returning *';
export const getAllPropertiesQuery = 'SELECT * FROM properties WHERE userid=$1';
export const getPropertyTypesQuery = 'SELECT * FROM properties WHERE type = $1 AND state = $2 AND city = $3 AND price = $4 AND duration = $5';
