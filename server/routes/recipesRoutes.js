/**
 * @module recipeRoutes
 * @description Routes for managing recipes, ingredients, and their relationships.
 */

const express = require(`express`)
const router = express.Router()

const recipes = require(`../controllers/recipes`)


/**
 * Get all recipes for the authenticated user (dashboard)
 * @name GET /dashboard
 * @function
 * @memberof module:recipeRoutes
 */
router.get(`/dashboard`, recipes.getRecList)

/**
 * Get all ingredients for the authenticated user
 * @name GET /ingredients
 * @function
 * @memberof module:recipeRoutes
 */
router.get(`/ingredients`, recipes.getIng)

/**
 * Get a specific recipe by ID
 * @name GET /:id
 * @function
 * @memberof module:recipeRoutes
 * @param {string} id - Recipe ID (URL parameter)
 */
router.get(`/:id`, recipes.getRec)

/**
 * Add a new ingredient
 * @name POST /ingredient
 * @function
 * @memberof module:recipeRoutes
 */
router.post(`/ingredient`, recipes.postIng)

/**
 * Create a new recipe with ingredients
 * @name POST /
 * @function
 * @memberof module:recipeRoutes
 */
router.post(`/`, recipes.postRec)

/**
 * Add ingredients to an existing recipe
 * @name POST /usedIn
 * @function
 * @memberof module:recipeRoutes
 */
router.post(`/usedIn`, recipes.postUsedIn)

/**
 * Update an existing recipe's title, instructions, and notes
 * @name PUT /
 * @function
 * @memberof module:recipeRoutes
 */
router.put(`/`, recipes.updRec)

/**
 * Update ingredients used in a recipe
 * @name PUT /usedIn
 * @function
 * @memberof module:recipeRoutes
 */
router.put(`/usedIn`, recipes.updUsedIn)

/**
 * Update an existing ingredient
 * @name PUT /ingredient
 * @function
 * @memberof module:recipeRoutes
 */
router.put(`/ingredient`, recipes.updIng)

/**
 * Delete a recipe
 * @name DELETE /
 * @function
 * @memberof module:recipeRoutes
 */
router.delete(`/`, recipes.delRec)

/**
 * Remove an ingredient from a specific recipe
 * @name DELETE /usedIn
 * @function
 * @memberof module:recipeRoutes
 */
router.delete(`/usedIn`, recipes.delUsedIn)

/**
 * Delete an ingredient entirely
 * @name DELETE /ingredient
 * @function
 * @memberof module:recipeRoutes
 */
router.delete(`/ingredient`, recipes.delIng)

module.exports = router

