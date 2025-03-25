const pool = require('../config/db');

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