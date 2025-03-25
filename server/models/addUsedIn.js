const pool = require('../config/db');

async function addUsedIn ({
  recipeId,
  ingredientId,
  quantity,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `INSERT INTO usedIn (
      recipeId,
      ingredientId,
      quantity
    ) VALUES (?, ?, ?)`,
    [
      recipeId,
      ingredientId,
      quantity,
    ]
  );

  await connection.release();
  return true;
}

module.exports = addUsedIn;