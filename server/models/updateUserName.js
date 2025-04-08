const pool = require('../config/db');

/**
 * @module updateUserName
 */

/**
 * @typedef {Object} updateUserNameParams
 * @property {string} userId - The userId
 * @property {string} userName - The userName
 */

/**
 * Updates a users password
 * @param {updateUserNameParams} params - The parameters
 * @returns {Promise<boolean>} - The response, returns true if updated fine
 */

async function updateUserName ({
  userId,
  userName,
}) {
  const connection = await pool.getConnection();

  await connection.execute(
    `UPDATE user
    SET userName = ?
    WHERE userId = ?`,
    [
      userName,
      userId,
    ],
  );

  await connection.release();
  return true;
}

module.exports = updateUserName;