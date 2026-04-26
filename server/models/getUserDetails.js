const pool = require('../config/db');

/**
 * @module getUserDetails
 */

/**
 * @typedef {Object} getUserDetailsParams
 * @property {number} userId - The userId
 */

/**
 * @typedef {Object} userDetails
 * @property {number} userName - The users userName
 * @property {string} email - The users email
 */

/**
 * @typedef {Object} getUserDetailsResponse
 * @property {userDetails[]} userDetails - An array of ingredient objects
 */

/**
 * Gets the users details
 * @param {getUserDetailsParams} params - The parameters
 * @returns {Promise<getUserDetailsResponse>} - The response object
 */

async function getUserDetails ({
  userId,
}) {
  const connection = await pool.getConnection();

  const [[results]] = await connection.execute(
    'SELECT * from getUserDetails WHERE userId = ?',
    [userId],
  );

  await connection.release();
  return {
    userDetails: {
      userName: results.userName,
      email: results.email,
    }
  };
}

module.exports = getUserDetails;