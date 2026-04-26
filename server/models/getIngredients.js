const pool = require('../config/db');

/**
 * @module getIngredients
 */

/**
 * @typedef {Object} getIngredientsParams
 * @property {number} userId - The userId
 */

/**
 * @typedef {Object} ingredientDetails
 * @property {number} ingredientId - The ingredientId
 * @property {string} name - The ingredient name
 * @property {string} measurement - The measurement used
 */

/**
 * @typedef {Object} getIngredientsResponse
 * @property {ingredientDetails[]} ingredientList - An array of ingredient objects
 */

/**
 * Gets a list of all ingredients for a user
 * @param {getIngredientsParams} params - The parameters
 * @returns {Promise<getIngredientsResponse>} - The response object
 */

async function getIngredients ({
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    'SELECT * from getIngredients WHERE userId = ?',
    [userId],
  );

  const response = results.map((ingredient) => ({
    ingredientId: ingredient.ingredientId,
    name: ingredient.name,
    measurement: ingredient.measurement,
  }))

  await connection.release();
  return { ingredientList: response };
}

module.exports = getIngredients;