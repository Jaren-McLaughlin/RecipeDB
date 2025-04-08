const pool = require('../config/db');

/**
 * @module updateIngredient
 */

/**
 * @typedef {Object} updateIngredientParams
 * @property {string} ingredientId - The ingredientId
 * @property {string} measurement - The measurement
 * @property {string} name - The ingredient name
 */

/**
 * Updates a users email
 * @param {updateIngredientParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if updated fine
 */

async function updateIngredient ({
  ingredientId,
  measurement,
  name,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `UPDATE ingredient
    SET name = ?, measurement = ?
    WHERE ingredientId = ?`,
    [
      name,
      measurement,
      ingredientId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = updateIngredient;