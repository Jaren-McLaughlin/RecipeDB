require('dotenv').config();
const mysql = require('mysql2/promise');
const getRecipeDetails = require('./getRecipeDetails');

let connection;
let ingredientId;
let recipeId;
let usedIn;

describe('getRecipeDetails', () => {
  beforeAll(async () => {
    connection = await mysql.createConnection({
      database: process.env.database,
      host: process.env.host,
      password: process.env.password,
      user: process.env.user,
    });
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
        userID,
      ) VALUES (?, ?, ?)`,
      [
        'myRecipe',
        `cook the food you fool!
        It's not that hard is it?`,
        userId,
      ],
    ));
    ([{ insertId: ingredientId }] = await connection.execute(
      `INSERT INTO ingredients (
        name,
        measurement,
        userID,
      ) VALUES (?, ?, ?)`,
      [
        'flour',
        'cup',
        userId,
      ],
    ));
    await connection.execute(
      `INSERT INTO usedin (
        recipeID,
        ingredientID,
        quantity
      ) VALUES (?, ?, ?)`,
      [
        recipeId,
        ingredientId,
        1,
      ],
    );
    console.log(userId, recipeId, ingredientId);
  });
  afterAll(async () => {
    await connection.execute(
      'DELETE FROM usedIn WHERE recipeID = ? AND ingredientID = ?',
      [recipeId, ingredientId],
    );
    await connection.execute(
      'DELETE FROM ingredients WHERE ingredientID = ?',
      [ingredientId],
    );
    await connection.execute(
      'DELETE FROM recipe WHERE recipeID = ?',
      [recipeId],
    );
    await connection.execute(
      'DELETE FROM user WHERE userID = ?',
      [userId],
    );
    await connection.end();
  });
  it('should work and get a recipe', async () => {
    expect.assertions(1);
    const response = await getRecipeDetails({ id: createdRecipe });
    expect(response).toStrictEqual(
      expect.objectContaining({
        
      })
    )
  })
})