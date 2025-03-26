const pool = require('../config/db');

async function getLoginDetails ({
  email,
}) {
  const connection = await pool.getConnection();

  const [[results]] = await connection.execute(
    'SELECT * from getLoginDetails WHERE email = ?',
    [email],
  );

  await connection.release();
  return {
    loginDetails: {
      userId: results.userId,
      password: results.password,
    }
  };
}

module.exports = getLoginDetails;