const pool = require('../config/db');

/**
 * @module updateRecipe
 */

/**
 * @typedef {Object} updateRecipeParams
 * @property {string} instructions - The recipe instructions
 * @property {string} notes - The recipe notes
 * @property {string} title - The recipe title
 * @property {number} recipeId - The recipeId
 */

/**
 * Deletes a recipe
 * @param {updateRecipeParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if updated fine
 */

async function updateRecipe ({
  title,
  instructions,
  notes,
  recipeId,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `UPDATE recipe
    SET title = ?,
    instructions = ?,
    notes = ?
    WHERE recipeId = ?`,
    [
      title,
      instructions,
      notes,
      recipeId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = updateRecipe;