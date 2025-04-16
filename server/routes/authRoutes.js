/**
 * @module authRoutes
 * @description Routes for user authentication (register, login, logout)
 */

const express = require(`express`)
const router = express.Router()
const auth = require(`../controllers/auth`)


/**
 * Register a new user
 * @name POST /register
 * @function
 * @memberof module:authRoutes
 * @inner
 */
router.post(`/register`, auth.register)

/**
 * Log in an existing user
 * @name POST /login
 * @function
 * @memberof module:authRoutes
 * @inner
 */
router.post(`/login`, auth.login)

/**
 * Log out the current user
 * @name POST /logout
 * @function
 * @memberof module:authRoutes
 * @inner
 */
router.post(`/logout`, auth.logout)


module.exports = router