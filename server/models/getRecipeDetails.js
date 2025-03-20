const pool = require('../config/db');

async function getRecipeDetails ({
  id,
}) {
  const connection = await pool.getConnection();

  const [[response]] = await connection.execute(
    'SELECT * from `getRecipeDetails` WHERE `recipeID` = ?',
    [id],
  );

  await connection.release();
  return {
    title: response.title,
    from: response.from,
    ingredients: response.ingredients,
    instructions: response.instructions,
    notes: response.notes,
  };
}

module.exports = getRecipeDetails;