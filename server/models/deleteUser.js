const pool = require('../config/db');

/**
 * @module deleteUser
 */

/**
 * @typedef {Object} deleteUserParams
 * @property {number} userId - The userId
 */

/**
 * Deletes a user
 * @param {deleteUserParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if deleted fine
 */

async function deleteUser ({
  userId,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `DELETE FROM user WHERE userId = ?`,
    [
      userId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = deleteUser;