const pool = require('../config/db');
const addIngredient = require('./addIngredient');

let connection;
let userId;

describe('addIngredient', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'addIngredientTest',
        'addIngredient@FakeEmail.com',
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
  it('should work and create an ingredient', async () => {
    expect.assertions(2);
    const response = await addIngredient({
      name: 'chocoloate chips',
      measurement: 'cup',
      userId,
    });
    expect(response).toStrictEqual({
      ingredientId: expect.any(Number),
    });

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM ingredient WHERE ingredientId = ?`,
      [
        response.ingredientId
      ],
    );
    expect(selectResult).toStrictEqual(
      expect.objectContaining({
      name: 'chocoloate chips',
      measurement: 'cup',
      userId,
    }));
  });
});