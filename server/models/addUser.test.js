const pool = require('../config/db');
const addUser = require('./addUser');

let connection;
let userId;

describe('addUser', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
  });
  afterAll(async () => {
    await connection.execute(
      'DELETE FROM user WHERE userID = ?',
      [userId],
    );
    await pool.end();
  });
  it('should work and create an ingredient', async () => {
    expect.assertions(2);
    ({ userId } = await addUser({
      userName: 'createUser',
      email: 'createUserTest@FakeEmail.com',
      password: 'password',
    }));
    expect(userId).toStrictEqual(expect.any(Number));

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM user WHERE userId = ?`,
      [
        userId,
      ],
    );
    expect(selectResult).toStrictEqual(
      expect.objectContaining({
        userId,
        userName: 'createUser',
        email: 'createUserTest@FakeEmail.com',
        password: 'password',
    }));
  });
});