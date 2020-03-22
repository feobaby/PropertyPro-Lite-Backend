const dropUsers = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropProperties = 'DROP TABLE IF EXISTS properties CASCADE; ';
const dropFlags = 'DROP TABLE IF EXISTS flags CASCADE; ';
const dropQuery = `${dropUsers}${dropProperties}${dropFlags}`;

export default dropQuery;
