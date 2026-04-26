/**
 * @module userRoutes
 * @description Routes for managing user account information and settings.
 */

const express = require(`express`)
const router = express.Router()

const users = require(`../controllers/users`)

/**
 * Get user account information (username and email)
 * @name GET /
 * @function
 * @memberof module:userRoutes
 */
router.get(`/`, users.getUserInfo)

/**
 * Update the authenticated user's email address
 * @name PUT /email
 * @function
 * @memberof module:userRoutes
 */
router.put(`/email`, users.updEmail)

/**
 * Update the authenticated user's username
 * @name PUT /username
 * @function
 * @memberof module:userRoutes
 */
router.put(`/username`, users.updUserName)

/**
 * Update the authenticated user's password
 * @name PUT /password
 * @function
 * @memberof module:userRoutes
 */
router.put(`/password`, users.updPass)

/**
 * Delete the authenticated user's account
 * @name DELETE /
 * @function
 * @memberof module:userRoutes
 */
router.delete(`/`, users.delUser)

module.exports = router