const signupQuery = `INSERT INTO
    users (email, first_name, last_name, password, phone_number, address, registered)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;

const signinQuery = 'SELECT * FROM users WHERE email = $1';

export {
  signupQuery,
  signinQuery,
};
