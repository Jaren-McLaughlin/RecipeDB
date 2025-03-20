const pool = require('../config/db');

async function addIngredient ({
  name,
  measurement,
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    `INSERT INTO ingredients (
      name,
      measurement,
      userID
    ) VALUES (?, ?, ?)`,
    [
      name,
      measurement,
      userId,
    ],
  );

  await connection.release();
  return { ingredientId: results.insertId };
}

module.exports = addIngredient;