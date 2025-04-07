const pool = require('../config/db');

/**
 * @module updateUsedIn
 */

/**
 * @typedef {Object} updateUsedInParams
 * @property {number} currentIngredientId - The current ingredientId
 * @property {number} newIngredientId - The new ingredientId
 * @property {number} quantity - The ingredient quantity
 * @property {number} recipeId - The recipeId
 */

/**
 * Deletes a recipe
 * @param {updateUsedInParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if updated fine
 */

async function updateUsedIn ({
  currentIngredientId,
  newIngredientId,
  quantity,
  recipeId,
}) {
  const connection = await pool.getConnection();
  
  await connection.execute(
    `UPDATE usedIn
    SET ingredientId = ?, quantity = ?
    WHERE recipeId = ? and ingredientId = ?`,
    [
      newIngredientId,
      quantity,
      recipeId,
      currentIngredientId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = updateUsedIn;