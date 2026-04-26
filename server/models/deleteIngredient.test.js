const pool = require('../config/db');
const deleteIngredient = require('./deleteIngredient');

let connection;
let ingredientId;
let userId;

describe('deleteIngredient', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'deleteIngredientTest',
        'deleteIngredientTest@FakeEmail.com',
        'password',
      ],
    ));
    ([{ insertId: ingredientId }] = await connection.execute(
      `INSERT INTO ingredient (
        name,
        measurement,
        userId
      ) VALUES (?, ?, ?)`,
      [
        'flour',
        'cups',
        userId,
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
  it('should work and deletes an ingredient', async () => {
    expect.assertions(2);
    const response = await deleteIngredient({
      ingredientId,
    });
    expect(response).toBe(true);

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM ingredient WHERE ingredientId = ?`,
      [
        ingredientId
      ],
    );
    expect(selectResult).toStrictEqual(undefined);
  });
});