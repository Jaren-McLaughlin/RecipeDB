const pool = require('../config/db');
const updateUsedIn = require('./updateUsedIn');

let connection;
let ingredientId;
let recipeId;
let userId;

describe('updateUsedIn', () => {
  beforeAll(async () => {
    connection = await pool.getConnection();
    ([{ insertId: userId }] = await connection.execute(
      `INSERT INTO user (
        userName,
        email,
        \`password\`
      ) VALUES (?, ?, ?)`,
      [
        'updateUsedInTest',
        'updateUsedInTest@FakeEmail.com',
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
  it('should work and update a recipe', async () => {
    expect.assertions(2);
    const response = await updateUsedIn({
      currentIngredientId: ingredientId,
      newIngredientId: ingredientId,
      quantity: 3.5,
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
    expect(selectResult).toStrictEqual(expect.objectContaining({
      ingredientId: ingredientId,
      quantity: 3.5,
      recipeId,
    }));
  });
  it('should work and update a recipe', async () => {
    expect.assertions(2);
    const response = await updateUsedIn({
      currentIngredientId: ingredientId,
      newIngredientId: ingredientId + 1,
      quantity: 1.5,
      recipeId,
    });
    expect(response).toBe(true);

    const [[selectResult]] = await connection.execute(
      `SELECT * FROM usedIn WHERE ingredientId = ? AND recipeId = ?`,
      [
        ingredientId + 1,
        recipeId,
      ],
    );
    expect(selectResult).toStrictEqual(expect.objectContaining({
      ingredientId: ingredientId + 1,
      quantity: 1.5,
      recipeId,
    }));
  });
});