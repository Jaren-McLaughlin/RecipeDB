const pool = require('../config/db');
const updateUserName = require('./updateUserName');

let connection;
let userId;

describe('updateUserName', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'updateUserNameTest',
        'updateUserNameTest@FakeEmail.com',
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
  it('should work and update a users userName', async () => {
    expect.assertions(2);
    const response = await updateUserName({
      userId,
      userName: 'updating username',
    });
    expect(response).toBe(true);

    const [[{ userName: selectResult }]] = await connection.execute(
      `SELECT userName FROM user WHERE userId = ?`,
      [
        userId,
      ],
    );
    expect(selectResult).toStrictEqual('updating username');
  });
});