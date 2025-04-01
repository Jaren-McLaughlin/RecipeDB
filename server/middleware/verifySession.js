require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET

async function verifySession ({
  token,
}) {
  const jwtData = jwt.verify(
    token,
    secretKey,
  );

  return { jwtData };
}

module.exports = verifySession;