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
      'DELETE FROM user WHERE userID = ?',
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
      `SELECT * FROM usedIn WHERE recipeID = ? AND ingredientID = ?`,
      [
        recipeId,
        ingredientId
      ],
    );
    expect(selectResult).toStrictEqual({
      recipeID: recipeId,
      ingredientID: ingredientId,
      quantity: "1",
    });
  });
});