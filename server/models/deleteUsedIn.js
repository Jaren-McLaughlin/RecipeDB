const pool = require('../config/db');

/**
 * @module deleteUsedIn
 */

/**
 * @typedef {Object} deleteUsedInParams
 * @property {number} ingredientId - The ingredientId
 * @property {number} recipeId - The recipeId
 */

/**
 * Deletes a recipe
 * @param {deleteUsedInParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if deleted fine
 */

async function deleteUsedIn ({
  ingredientId,
  recipeId,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `DELETE FROM usedIn WHERE ingredientId = ? AND recipeId = ?;`,
    [
      ingredientId,
      recipeId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = deleteUsedIn;