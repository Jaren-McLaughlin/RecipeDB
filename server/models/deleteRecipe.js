const pool = require('../config/db');

/**
 * @module deleteRecipe
 */

/**
 * @typedef {Object} deleteRecipeParams
 * @property {number} recipeId - The recipeId
 */

/**
 * Deletes a recipe
 * @param {deleteRecipeParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if deleted fine
 */

async function deleteRecipe ({
  recipeId,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `DELETE FROM recipe WHERE recipeId = ?`,
    [
      recipeId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = deleteRecipe;