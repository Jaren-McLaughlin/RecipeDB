const pool = require('../config/db');
const getRecipeDetails = require('./getRecipeDetails');

let connection;
let ingredientId;
let recipeId;

describe('getRecipeDetails', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO User (
        userName,
        email,
        passwordHash
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
        userID
      ) VALUES (?, ?, ?)`,
      [
        'myRecipe',
        'cook the food you fool!\nIt\'s not that hard is it?',
        userId,
      ],
    ));
    ([{ insertId: ingredientId }] = await connection.execute(
      `INSERT INTO ingredients (
        name,
        measurement,
        userID
      ) VALUES (?, ?, ?), (?, ?, ?)`,
      [
        'flour',
        'cup',
        userId,
        'water',
        'cup',
        userId,
      ],
    ));
    await connection.execute(
      `INSERT INTO usedin (
        recipeID,
        ingredientID,
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
      'DELETE FROM user WHERE userID = ?',
      [userId],
    );
    await pool.end();
  });
  it('should work and get a recipe', async () => {
    expect.assertions(1);
    const response = await getRecipeDetails({ id: recipeId });
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