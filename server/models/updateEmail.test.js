const pool = require('../config/db');
const updateEmail = require('./updateEmail');

let connection;
let userId;

describe('updateEmail', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'updateEmailTest',
        'updateEmailTest@FakeEmail.com',
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
  it('should work and update a users email', async () => {
    expect.assertions(2);
    const response = await updateEmail({
      userId,
      email: 'newEmail@notARealEmailAddress.com',
    });
    expect(response).toBe(true);

    const [[{ email: selectResult }]] = await connection.execute(
      `SELECT email FROM user WHERE userId = ?`,
      [
        userId,
      ],
    );
    expect(selectResult).toStrictEqual('newEmail@notARealEmailAddress.com');
  });
});