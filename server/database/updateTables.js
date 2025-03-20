require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const updateTables = async () => {
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
      // commented to reduce noise, uncomment to debug if needs be
      // console.log(e);
    }
  };
  await connection.end();
};

updateTables();
