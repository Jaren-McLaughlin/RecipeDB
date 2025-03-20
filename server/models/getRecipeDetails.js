const pool = require('../config/db');

async function getRecipeDetails ({
  recipeId,
}) {
  const connection = await pool.getConnection();

  const [[response]] = await connection.execute(
    'SELECT * from `getRecipeDetails` WHERE `recipeID` = ?',
    [recipeId],
  );

  await connection.release();
  return {
    title: response.title,
    ingredients: response.ingredients,
    instructions: response.instructions,
    notes: response.notes,
  };
}

module.exports = getRecipeDetails;