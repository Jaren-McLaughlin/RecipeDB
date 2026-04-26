require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET

/**
 * @module verifyToken
 */

/**
 * @typedef {Object} verifyTokenParams
 * @property {string} token - The user token
 */

/**
 * @typedef {Object} verifyTokenResponse
 * @property {jwtData} jwtData - An object of the jwt data
 */

/**
 * @typedef {Object} jwtData
 * @property {number} userId - The userId
 * @property {number} iat - Created timestamp
 * @property {number} exp - expires timestamp
 */

/**
 * Verifies a jwt
 * @param {verifyTokenParams} params - The parameters
 * @returns {Promise<verifyTokenResponse>} - The response object
 */

async function verifyToken ({
  token,
}) {
  const jwtData = jwt.verify(
    token,
    secretKey,
  );

  return { jwtData };
}

module.exports = verifyToken;