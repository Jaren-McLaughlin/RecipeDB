const pool = require('../config/db');

/**
 * @module getLoginDetails
 */

/**
 * @typedef {Object} getLoginDetailsParams
 * @property {string} email - The users email
 */

/**
 * @typedef {Object} loginDetails
 * @property {number} userId - The users userId
 * @property {string} password - The users password
 */

/**
 * @typedef {Object} getLoginDetailsParams
 * @property {loginDetails} loginDetails - The users email
 */

/**
 * Gets the login details for a user
 * @param {getLoginDetailsParams} params - The parameters
 * @returns {Promise<getLoginDetailsResponse>} - The response object
 */

async function getLoginDetails ({
  email,
}) {
  const connection = await pool.getConnection();

  const [[results]] = await connection.execute(
    'SELECT * from getLoginDetails WHERE email = ?',
    [email],
  );

  await connection.release();
  return {
    loginDetails: {
      userId: results.userId,
      password: results.password,
    }
  };
}

module.exports = getLoginDetails;