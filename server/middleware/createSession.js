require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET

async function createSession ({
  userId,
}) {
  const payload = {
    
    userId,
  };

  const token = jwt.sign(
    payload,
    secretKey,
    { expiresIn: '15m' },
  );

  return { token };
}

module.exports = createSession;