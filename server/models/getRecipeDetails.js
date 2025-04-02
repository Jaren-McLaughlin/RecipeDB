const pool = require('../config/db');

/**
 * @module getRecipeDetails
 */

/**
 * @typedef {Object} getRecipeDetailsParams
 * @property {number} recipeId - The recipe id
 */

/**
 * @typedef {Object} ingredientDetails
 * @property {string} name - The ingredient name
 * @property {number} quantity - The ingredient quantity
 * @property {string} measurement - The ingredient measurement
 */

/**
 * @typedef {Object} recipeDetails
 * @property {number} title - The recipe title
 * @property {ingredientDetails[]} ingredients - The ingredient object
 * @property {string} instructions - The recipe instructions
 * @property {string} notes - The recipe notes
 */

/**
 * @typedef {Object} getRecipeDetailsResponse
 * @property {recipeDetails} recipeDetails - The recipe card
 * @property {number} userId - The owner of the recipe
 */

/**
 * Gets the details of a recipe
 * @param {getRecipeDetailsParams} params - The parameters
 * @returns {Promise<getRecipeDetailsResponse>} - The response object
 */

async function getRecipeDetails ({
  recipeId,
}) {
  const connection = await pool.getConnection();

  const [[response]] = await connection.execute(
    'SELECT * from `getRecipeDetails` WHERE `recipeId` = ?',
    [recipeId],
  );

  await connection.release();
  return {
    recipeDetails: {
      title: response.title,
      ingredients: response.ingredient,
      instructions: response.instructions,
      notes: response.notes,
    },
    userId: response.userId,
  };
}

module.exports = getRecipeDetails;