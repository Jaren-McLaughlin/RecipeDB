const pool = require('../config/db');
const updatePassword = require('./updatePassword');

let connection;
let userId;

describe('updatePassword', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'updatePasswordTest',
        'updatePasswordTest@FakeEmail.com',
        'password',
      ],
    ));
  });
  afterAll(async () => {
    await connection.execute(
      'DELETE FROM user WHERE userId = ?',
      [userId],
    );
    await pool.end();
  });
  it('should work and update a users password', async () => {
    expect.assertions(2);
    const response = await updatePassword({
      userId,
      password: 'newPassword',
    });
    expect(response).toBe(true);

    const [[{ password: selectResult }]] = await connection.execute(
      `SELECT \`password\` FROM user WHERE userId = ?`,
      [
        userId,
      ],
    );
    expect(selectResult).toStrictEqual('newPassword');
  });
});