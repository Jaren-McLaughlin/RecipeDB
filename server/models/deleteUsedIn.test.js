const pool = require('../config/db');
const deleteUsedIn = require('./deleteUsedIn');

let connection;
let ingredientId;
let recipeId;
let userId;

describe('deleteUsedIn', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'deleteUsedInTest',
        'deleteUsedInTest@FakeEmail.com',
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
    await connection.execute(
      `INSERT INTO usedIn (
        recipeId,
        ingredientId,
        quantity
      ) VALUES (?, ?, ?)`,
      [
        recipeId,
        ingredientId,
        1,
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
  it('should work and delete from usedIn', async () => {
    expect.assertions(2);
    const response = await deleteUsedIn({
      ingredientId,
      recipeId,
    });
    expect(response).toBe(true);

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM usedIn WHERE ingredientId = ? AND recipeId = ?`,
      [
        ingredientId,
        recipeId,
      ],
    );
    expect(selectResult).toStrictEqual(undefined);
  });
});