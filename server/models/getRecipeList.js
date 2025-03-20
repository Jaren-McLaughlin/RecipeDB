const pool = require('../config/db');

async function getRecipeList ({
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    'SELECT * from `getRecipeList` WHERE `userID` = ?',
    [userId],
  );
  const response = results.map((recipe) => ({
    recipeId: recipe.recipeID,
    title: recipe.title,
    userName: recipe.userName,
  }));
  console.log(response)
  await connection.release();
  return { recipeList: response};
}

module.exports = getRecipeList;