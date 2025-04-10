require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

/**
 * Generates the schema for all tables and view tables in the database
 * IMPORANT: You must run updateTables for this to generate the current db schema
 */

async function genSchema () {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'recipeDB',
    multipleStatements: true,
  });
  const [tables] = await connection.query('SHOW TABLES;')
  const promises = [];
  tables.forEach((table) => {
    const [value] = Object.values(table)
    // Yes this could be sql injectable, make sure your table names are clean before running this.
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(value)) {
      throw new error('potential malicious table detected', value)
    }
    promises.push(connection.query(
    `SHOW CREATE TABLE ${value};`,
    ));
  });
  await connection.end();
  const respones = await Promise.all(promises)
  const schema = respones.map(([[response]]) => {
    if (Object.hasOwn(response, 'Create View')) {
      const raw = response['Create View'];
      const clean = raw.replace(/^.+ VIEW/, 'CREATE VIEW').replace(/`/g, '').replace(/,/g, ',\n');
      return clean;
    }
    if (Object.hasOwn(response, 'Create Table')) {
      const raw = response['Create Table'];
      const clean = raw.replace(/\).+/g, ')');
      return clean;
    }
  })
  const docLocation = path.join(__dirname, '../../docs/documentation');
  await fs.promises.copyFile(`${docLocation}/dbSchema.sql`, `${docLocation}/dbSchemaBackup.sql`);

  const writeStream = fs.createWriteStream(`${docLocation}/dbSchema.sql`)
  schema.forEach((line) => {
    writeStream.write(line + '\n\n');
  });
  writeStream.end();
};

genSchema();