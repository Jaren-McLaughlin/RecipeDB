const pool = require('../config/db');
const addUsedIn = require('./addUsedIn');

let connection;
let userId;
let recipeId;
let ingredientId;

describe('addUsedIn', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        password
      ) VALUES (?, ?, ?)`,
      [
        'addUsedInTest',
        'addUsedInTest@FakeEmail.com',
        'password',
      ],
    ));
    ([{ insertId: recipeId }] = await connection.execute(
      `INSERT INTO recipe (
        title,
        instructions,
        userId
      ) VALUES (?, ?, ?)`,
      [
        'myRecipe',
        'cook the food you fool!\nIt\'s not that hard is it?',
        userId,
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
        'cup',
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
  it('should work and add a record to usedIn', async () => {
    expect.assertions(2);
    const response = await addUsedIn({
      recipeId,
      ingredientId,
      quantity: 1,
    });
    expect(response).toBe(true);

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM usedIn WHERE recipeId = ? AND ingredientId = ?`,
      [
        recipeId,
        ingredientId
      ],
    );
    expect(selectResult).toStrictEqual({
      recipeId,
      ingredientId,
      quantity: "1",
    });
  });
});