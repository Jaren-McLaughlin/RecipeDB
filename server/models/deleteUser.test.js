const pool = require('../config/db');
const deleteUser = require('./deleteUser');

let connection;
let userId;

describe('deleteUser', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'deleteUserTest',
        'deleteUserTest@FakeEmail.com',
        'password',
      ],
    ));
  });
  afterAll(async () => {
    await pool.end();
  });
  it('should work and deletes a user', async () => {
    expect.assertions(2);
    const response = await deleteUser({
      userId,
    });
    expect(response).toBe(true);

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM user WHERE userId = ?`,
      [
        userId
      ],
    );
    expect(selectResult).toStrictEqual(undefined);
  });
});