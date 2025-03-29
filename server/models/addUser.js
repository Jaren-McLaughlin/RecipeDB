const pool = require('../config/db');

/**
 * @typedef {Object} addUserParams
 * @property {string} userName - The users userName
 * @property {string} email - The users email
 * @property {number} password - The users password
 */

/**
 * @typedef {Object} addUserResponse
 * @property {number} userId - The created userId
 */

/**
 * Adds a user
 * @param {addUserParams} params - The parameters
 * @returns {Promise<addUserResponse>} - The response
 */

async function addUser ({
  userName,
  email,
  password,
}) {
  const connection = await pool.getConnection();

  const [results] = await connection.execute(
    `INSERT INTO user (
      userName,
      email,
      \`password\`
    ) VALUES (?, ?, ?)`,
    [
      userName,
      email,
      password,
    ],
  );

  await connection.release();
  return { userId: results.insertId };
}

module.exports = addUser;