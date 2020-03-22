import dotenv from 'dotenv';
import { createQuery, dropQuery } from './migrations/index';

const { Pool } = require('pg');

dotenv.config();
const queries = `${dropQuery}${createQuery}`;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

pool.query(queries)
  .then(() => {
    pool.end();
    console.log('Tables have been dropped and created!');
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });

export default queries;
