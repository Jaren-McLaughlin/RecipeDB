const pool = require('../config/db');
const updateIngredient = require('./updateIngredient');

let connection;
let ingredientId;
let userId;

describe('updateIngredient', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'updateIngredientTest',
        'updateIngredientTest@FakeEmail.com',
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
  it('should work and update an ingredient', async () => {
    expect.assertions(2);
    const response = await updateIngredient({
      name: 'swampWater',
      measurement: 'Gallon',
      ingredientId,
    });
    expect(response).toBe(true);

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM ingredient WHERE ingredientId = ?`,
      [
        ingredientId,
      ],
    );
    expect(selectResult).toStrictEqual(expect.objectContaining({
      ingredientId,
      measurement: 'Gallon',
      name: 'swampWater',
      userId,
    }));
  });
});