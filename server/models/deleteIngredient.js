const pool = require('../config/db');

/**
 * @module deleteIngredient
 */

/**
 * @typedef {Object} deleteIngredientParams
 * @property {number} ingredientId - The ingredientId
 */

/**
 * Deletes an ingredient
 * @param {deleteIngredientParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if deleted fine
 */

async function deleteIngredient ({
  ingredientId,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `DELETE FROM ingredient WHERE ingredientId = ?`,
    [
      ingredientId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = deleteIngredient;