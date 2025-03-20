const pool = require('../config/db');
const addRecipe = require('./addRecipe');

let connection;
let userId;

describe('addRecipe', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO User (
        userName,
        email,
        passwordHash
      ) VALUES (?, ?, ?)`,
      [
        'getRecipeListsTest',
        'getRecipeLists@FakeEmail.com',
        'password',
      ],
    ));
  });
  afterAll(async () => {
    await connection.execute(
      'DELETE FROM user WHERE userID = ?',
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
      `SELECT * FROM recipe WHERE recipeID = ?`,
      [
        response.recipeId
      ],
    );
    expect(selectResult).toStrictEqual({
      recipeID: response.recipeId,
      title: 'addRecipeTest',
      instructions: 'Lets cook up some code to start this',
      notes: 'This is only a test, cooking this is not recommened.\nConsume at your own risk.',
      userID: userId,
    });
  });
});