require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

/**
 * Updates the sql tables with all the migration files. You can use npm run updateTables to run this file
 * @param {boolean} logging - toggles whether failed updates should be logged
 */

const updateTables = async ({ logging }) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'recipeDB',
    multipleStatements: true,
  });
  const migrationPath = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationPath)
  for (const file of files) {
    const filePath = path.join(migrationPath,file)
    const sqlCommands = fs.readFileSync(filePath, 'utf8');
    try {
      await connection.query(sqlCommands)
    } catch (e) {
      if (logging) {
        console.log(e);
      }
    }
  };
  await connection.end();
};

updateTables(
  process.argv[2] === 'true'
  ? { logging: process.argv[2] }
  : { logging: false }
);