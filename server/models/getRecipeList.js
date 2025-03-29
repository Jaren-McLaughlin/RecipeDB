const pool = require('../config/db');

/**
 * @typedef {Object} getRecipeListParams
 * @property {number} userId - The userId
 */

/**
 * @typedef {Object} recipeDetails
 * @property {number} recipeId - The recipeId
 * @property {string} title - The recipe title
 * @property {string} userName - The userName of whos recipe this is
 */

/**
 * @typedef {Object} getRecipeListResponse
 * @property {recipeDetails[]} recipeList - An array of ingredient objects
 */

/**
 * Gets a list of all recipes for a user
 * @param {getRecipeListParams} params - The parameters
 * @returns {Promise<getRecipeListResponse>} - The response
 */

async function getRecipeList ({
  userId,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    'SELECT * from getRecipeList WHERE userId = ?',
    [userId],
  );

  const response = results.map((recipe) => ({
    recipeId: recipe.recipeId,
    title: recipe.title,
    userName: recipe.userName,
  }));

  await connection.release();
  return { recipeList: response};
}

module.exports = getRecipeList;