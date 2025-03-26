const pool = require('../config/db');
const getLoginDetails = require('./getLoginDetails');

const email = 'getLoginDetails@FakeEmail.com';
let connection;
let userId;

describe('getLoginDetails', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'getLoginDetailsTest',
        email,
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
  it('should get the users details', async () => {
    expect.assertions(1);
    const { loginDetails } = await getLoginDetails({ email });

    expect(loginDetails).toStrictEqual(
      expect.objectContaining({
        userId,
        password: 'password',
      }),
    );
  });
});