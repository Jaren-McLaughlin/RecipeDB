const pool = require('../config/db');

async function getIngredients ({
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    'SELECT * from getIngredients WHERE userId = ?',
    [userId],
  );

  const response = results.map((ingredient) => ({
    ingredientId: ingredient.ingredientId,
    name: ingredient.name,
    measurement: ingredient.measurement,
  }))

  await connection.release();
  return { ingredientList: response };
}

module.exports = getIngredients;