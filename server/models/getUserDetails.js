const pool = require('../config/db');

async function getUserDetails ({
  userId,
}) {
  const connection = await pool.getConnection();

  const [[results]] = await connection.execute(
    'SELECT * from getUserDetails WHERE userId = ?',
    [userId],
  );

  await connection.release();
  return {
    userDetails: {
      userName: results.userName,
      email: results.email,
    }
  };
}

module.exports = getUserDetails;