const pool = require('../config/db');

async function addRecipe ({
  instructions,
  notes,
  title,
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    `INSERT INTO recipe (
      instructions,
      notes,
      title,
      userID
    ) VALUES (?, ?, ?, ?)`,
    [
      instructions,
      notes,
      title,
      userId,
    ],
  );

  await connection.release();
  return { recipeId: results.insertId };
}

module.exports = addRecipe;