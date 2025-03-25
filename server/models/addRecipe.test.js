const pool = require('../config/db');
const addRecipe = require('./addRecipe');

let connection;
let userId;

describe('addRecipe', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        password
      ) VALUES (?, ?, ?)`,
      [
        'addRecipeTest',
        'addRecipeTest@FakeEmail.com',
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
  it('should work and create a recipe', async () => {
    expect.assertions(2);
    const response = await addRecipe({
      title: 'addRecipeTest',
      instructions: 'Lets cook up some code to start this',
      notes: 'This is only a test, cooking this is not recommened.\nConsume at your own risk.',
      userId,
    });
    expect(response).toStrictEqual({
      recipeId: expect.any(Number),
    });

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM recipe WHERE recipeId = ?`,
      [
        response.recipeId
      ],
    );
    expect(selectResult).toStrictEqual({
      recipeId: response.recipeId,
      title: 'addRecipeTest',
      instructions: 'Lets cook up some code to start this',
      notes: 'This is only a test, cooking this is not recommened.\nConsume at your own risk.',
      userId,
    });
  });
});