require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET


/**
 * @module createToken
 */

/**
 * @typedef {Object} createTokenParams
 * @property {number} userId - The userId
 */

/**
 * @typedef {Object} createTokenResponse
 * @property {string} token - The created user token
 */

/**
 * Creates a jwt
 * @param {createTokenParams} params - The parameters
 * @returns {Promise<createTokenResponse>} - The response object
 */

async function createToken ({
  userId,
}) {
  const payload = {
    userId,
  };

  const token = jwt.sign(
    payload,
    secretKey,
    { expiresIn: '1h' },
  );

  return { token };
}

module.exports = createToken;