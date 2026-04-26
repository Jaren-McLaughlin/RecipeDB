const pool = require('../config/db');

/**
 * @module updateEmail
 */

/**
 * @typedef {Object} updateEmailParams
 * @property {string} userId - The userId
 * @property {string} email - The new email
 */

/**
 * Updates a users email
 * @param {updateEmailParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if updated fine
 */

async function updateEmail ({
  userId,
  email,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `UPDATE user
    SET email = ?
    WHERE userId = ?`,
    [
      email,
      userId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = updateEmail;