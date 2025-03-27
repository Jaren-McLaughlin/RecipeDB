require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

/**
 * Creates dummy data in the sql tables. You can use npm run createData to run this file
 * @param {boolean} logging - toggles whether failed inserts should be logged
 */

const createData = async ({ logging }) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'recipeDB',
    multipleStatements: true,
  });
  const createDataPath = path.join(__dirname, 'seeds/insertData.sql');
  const sqlCommands = fs.readFileSync(createDataPath, 'utf8');
  try {
    await connection.query(sqlCommands)
  } catch (e) {
    if (logging) {
      console.log(e);
    }
  }
  await connection.end();
};

createData(
  process.argv[2] === 'true'
  ? { logging: process.argv[2] }
  : { logging: false }
);