const pool = require('../config/db');
const getIngredients = require('./getIngredients');

let connection;
let userId;

describe('getIngredients', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'getIngredientsTest',
        'getIngredients@FakeEmail.com',
        'password',
      ],
    ));
    await connection.execute(
      `INSERT INTO ingredient (
        name,
        measurement,
        userId
      ) VALUES (?, ?, ?), (?, ?, ?)`,
      [
        'flour',
        'cups',
        userId,
        'sugar',
        'tbsp',
        userId,
      ],
    );
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
    const { ingredientList } = await getIngredients({ userId });
    expect(ingredientList).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'flour',
          measurement: 'cups',
        }),
        expect.objectContaining({
          name: 'sugar',
          measurement: 'tbsp',
        }),
      ]),
    );
  });
});