const pool = require('../config/db');
const updateRecipe = require('./updateRecipe');

let connection;
let recipeId;
let userId;

describe('updateRecipe', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'updateRecipeTest',
        'updateRecipeTest@FakeEmail.com',
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
  it('should work and update a recipe', async () => {
    expect.assertions(2);
    const response = await updateRecipe({
      title: 'Update Recipe Title',
      instructions: 'My new instructions on how to cook this amazing dish',
      notes: 'Dont believe me ask the dishes',
      recipeId,
    });
    expect(response).toBe(true);

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM recipe WHERE recipeId = ?`,
      [
        recipeId
      ],
    );
    expect(selectResult).toStrictEqual(expect.objectContaining({
      title: 'Update Recipe Title',
      instructions: 'My new instructions on how to cook this amazing dish',
      notes: 'Dont believe me ask the dishes',
      recipeId,
    }));
  });
});