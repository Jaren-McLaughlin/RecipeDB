const pool = require('../config/db');

async function getRecipeList ({
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    'SELECT * from getRecipeList WHERE userId = ?',
    [userId],
  );

  const response = results.map((recipe) => ({
    recipeId: recipe.recipeId,
    title: recipe.title,
    userName: recipe.userName,
  }));

  await connection.release();
  return { recipeList: response};
}

module.exports = getRecipeList;