const pool = require('../config/db');

/**
 * @module updatePassword
 */

/**
 * @typedef {Object} updatePasswordParams
 * @property {string} userId - The userId
 * @property {string} password - The new password
 */

/**
 * Updates a users password
 * @param {updatePasswordParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if updated fine
 */

async function updatePassword ({
  userId,
  password,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `UPDATE user
    SET \`password\` = ?
    WHERE userId = ?`,
    [
      password,
      userId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = updatePassword;