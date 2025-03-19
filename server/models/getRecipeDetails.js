require('dotenv').config();
const mysql = require('mysql2/promise');

async function getRecipeDetails ({
  id,
}) {
  const connection = await mysql.createConnection({
    database: process.env.database,
    host: process.env.host,
    password: process.env.password,
    user: process.env.user,
  });

  const [results] = await connection.execute(
    'SELECT * from `recipe` WHERE `recipeID` = ?',
    [id],
  );

  await connection.end();
  return results;
}

module.exports = getRecipeDetails;