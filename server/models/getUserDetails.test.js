const pool = require('../config/db');
const getUserDetails = require('./getUserDetails');

let connection;
let userId;

describe('getUserDetails', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'getUserTest',
        'getUserDetails@FakeEmail.com',
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
  it('should work and get a list of ingredients', async () => {
    expect.assertions(1);
    const { userDetails } = await getUserDetails({ userId });

    expect(userDetails).toStrictEqual(
      expect.objectContaining({
        userName: 'getUserTest',
        email: 'getUserDetails@FakeEmail.com',
      }),
    );
  });
});