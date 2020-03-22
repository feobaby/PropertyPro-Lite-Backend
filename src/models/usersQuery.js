export const signupQuery = `INSERT INTO
    users (email, firstname, lastname, password, phonenumber, address, registered)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;

export const signinQuery = 'SELECT * FROM users WHERE email = $1';
