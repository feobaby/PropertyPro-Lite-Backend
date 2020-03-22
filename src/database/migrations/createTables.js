const createUsersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        password VARCHAR(128) NOT NULL,
        phonenumber VARCHAR(50),
        address VARCHAR(100) NOT NULL,
        isadmin BOOLEAN DEFAULT false,
        registered TIMESTAMP
        );
        `;

const createPropertiesTable = `CREATE TABLE IF NOT EXISTS
      properties(
        id SERIAL PRIMARY KEY,
        userid INTEGER REFERENCES users(id),
        status VARCHAR(50),
        price VARCHAR(128),
        duration VARCHAR(128),
        state VARCHAR(50),
        city VARCHAR(50),
        address VARCHAR(128),
        type VARCHAR(50),
        createdon TIMESTAMP,
        imageurl VARCHAR(128),
        owneremail VARCHAR(128) REFERENCES users(email)
        );
        `;
const createFlagsTable = `CREATE TABLE IF NOT EXISTS
      flags(
        id SERIAL PRIMARY KEY,
        userid INTEGER REFERENCES users(id),
        propertyid INTEGER REFERENCES properties(id),
        createdon TIMESTAMP,
        reason VARCHAR(50),
        description VARCHAR(200)
        );
        `;

const createQuery = `${createUsersTable}${createPropertiesTable}${createFlagsTable}`;

export default createQuery;
