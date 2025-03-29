require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

/**
 * Deletes all the data in the sql tables. You can use npm run deleteData to run this file
 * @param {boolean} logging - toggles whether failed deletes should be logged
 */

const deleteData = async ({ logging }) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'recipeDB',
    multipleStatements: true,
  });
  const deleteDataPath = path.join(__dirname, 'seeds/deleteData.sql');
  const sqlCommands = fs.readFileSync(deleteDataPath, 'utf8');
  try {
    await connection.query(sqlCommands)
  } catch (e) {
    if (logging) {
      console.log(e);
    }
  }
  await connection.end();
};

deleteData(
  process.argv[2] === 'true'
  ? { logging: process.argv[2] }
  : { logging: false }
);