const pool = require('../config/db');
const getRecipeList = require('./getRecipeList');

let connection;
let userId;

describe('getRecipeList', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'getRecipeListsTest',
        'getRecipeLists@FakeEmail.com',
        'password',
      ],
    ));
    await connection.execute(
      `INSERT INTO recipe (
        title,
        instructions,
        userId
      ) VALUES (?, ?, ?), (?, ?, ?)`,
      [
        'myRecipe',
        'cook the food you fool!\nIt\'s not that hard is it?',
        userId,
        'mySecondRecipe',
        'This one might be to hard for you to cook.',
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
  it('should work and get a list of recipes', async () => {
    expect.assertions(1);
    const response = await getRecipeList({ userId });
    expect(response).toStrictEqual(
      expect.objectContaining({
        recipeList: expect.arrayContaining([
          expect.objectContaining({
            title: 'myRecipe',
            userName: 'getRecipeListsTest',
          }),
          expect.objectContaining({
            title: 'mySecondRecipe',
            userName: 'getRecipeListsTest',
          }),
        ]),
      }),
    );
  });
});