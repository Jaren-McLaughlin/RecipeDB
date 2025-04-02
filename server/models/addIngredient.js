const pool = require('../config/db');

/**
 * @module addIngredient
 */

/**
 * @typedef {Object} addIngredientParams
 * @property {string} name - The ingredient name
 * @property {string} measurement - The measurement
 * @property {number} userId - The userId
 */

/**
 * @typedef {Object} addIngredientResponse
 * @property {number} ingredientId - The ingredientId
 */

/**
 * Adds an ingredient
 * @param {addIngredientParams} params - The parameters
 * @returns {Promise<addIngredientResponse>} - The response object
 */

async function addIngredient ({
  name,
  measurement,
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    `INSERT INTO ingredient (
      name,
      measurement,
      userId
    ) VALUES (?, ?, ?)`,
    [
      name,
      measurement,
      userId,
    ],
  );

  await connection.release();
  return { ingredientId: results.insertId };
}

module.exports = addIngredient;