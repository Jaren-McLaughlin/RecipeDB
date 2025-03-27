const pool = require('../config/db');

/**
 * @typedef {Object} addUsedInParams
 * @property {number} recipeId - The recipeId
 * @property {number} ingredientId - The ingredientId
 * @property {number} quantity - The ingredient quantity
 */

/**
 * Adds an ingredient to a recipe
 * @param {addUsedInParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if inserted fine
 */

async function addUsedIn ({
  recipeId,
  ingredientId,
  quantity,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `INSERT INTO usedIn (
      recipeId,
      ingredientId,
      quantity
    ) VALUES (?, ?, ?)`,
    [
      recipeId,
      ingredientId,
      quantity,
    ]
  );

  await connection.release();
  return true;
}

module.exports = addUsedIn;