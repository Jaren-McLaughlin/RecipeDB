const pool = require('../config/db');
const deleteRecipe = require('./deleteRecipe');

let connection;
let recipeId;
let userId;

describe('deleteRecipe', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'deleteRecipeTest',
        'deleteRecipeTest@FakeEmail.com',
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
  });
  afterAll(async () => {
    await connection.execute(
      'DELETE FROM user WHERE userId = ?',
      [userId],
    );
    await pool.end();
  });
  it('should work and delete a recipe', async () => {
    expect.assertions(2);
    const response = await deleteRecipe({
      recipeId,
    });
    expect(response).toBe(true);

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM recipe WHERE recipeId = ?`,
      [
        recipeId
      ],
    );
    expect(selectResult).toStrictEqual(undefined);
  });
});