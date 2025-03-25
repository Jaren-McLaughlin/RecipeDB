const pool = require('../config/db');
const getRecipeDetails = require('./getRecipeDetails');

let connection;
let userId;
let recipeId;

describe('getRecipeDetails', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        password
      ) VALUES (?, ?, ?)`,
      [
        'getRecipeDetailsTest',
        'getRecipeDetail@FakeEmail.com',
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
    const [{ insertId: ingredientId }] = await connection.execute(
      `INSERT INTO ingredient (
        name,
        measurement,
        userId
      ) VALUES (?, ?, ?), (?, ?, ?)`,
      [
        'flour',
        'cup',
        userId,
        'water',
        'cup',
        userId,
      ],
    );
    await connection.execute(
      `INSERT INTO usedIn (
        recipeId,
        ingredientId,
        quantity
      ) VALUES (?, ?, ?), (?, ?, ?)`,
      [
        recipeId,
        ingredientId,
        1,
        recipeId,
        (ingredientId + 1),
        1.5,
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
  it('should work and get a recipe', async () => {
    expect.assertions(1);
    const response = await getRecipeDetails({ recipeId });
    expect(response).toStrictEqual(
      expect.objectContaining({
        title: 'myRecipe',
        instructions: 'cook the food you fool!\nIt\'s not that hard is it?',
        notes: null,
        ingredients: expect.arrayContaining([
          expect.objectContaining({
            name: 'flour',
            quantity: '1',
            measurement: 'cup',
          }),
          expect.objectContaining({
            name: 'water',
            quantity: '1.5',
            measurement: 'cup',
          }),
        ]),
      }),
    );
  });
});