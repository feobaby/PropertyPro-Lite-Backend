import dotenv from 'dotenv';
import { createUserQuery } from './1-users';
import { createPropertyQuery } from './2-properties';
import { createFlagQuery } from './3-flags';

const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const queries = `${createUserQuery};${createPropertyQuery};${createFlagQuery};`;

pool.query(queries, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Queries added!');
  }
});
