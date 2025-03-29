const pool = require('../config/db');

/**
 * @typedef {Object} addRecipeParams
 * @property {string} instructions - The recipe instructions
 * @property {string} notes - The recipe notes
 * @property {string} title - The recipe title
 * @property {number} userId - The userId
 */

/**
 * @typedef {Object} addRecipeResponse
 * @property {number} recipeId - The recipeId
 */

/**
 * Adds a recipe
 * @param {addRecipeParams} params - The parameters
 * @returns {Promise<addRecipeResponse>} - The response
 */

async function addRecipe ({
  instructions,
  notes,
  title,
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    `INSERT INTO recipe (
      instructions,
      notes,
      title,
      userId
    ) VALUES (?, ?, ?, ?)`,
    [
      instructions,
      notes,
      title,
      userId,
    ],
  );

  await connection.release();
  return { recipeId: results.insertId };
}

module.exports = addRecipe;