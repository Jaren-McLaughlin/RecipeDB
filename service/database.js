require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid').v4;

//MongoDB connection string - replace with your actual credentials
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'recipemaster';

let db = null;

//Initialize database connection
async function connectDB() {
  if (db) return db;
  
  console.log('Initializing MongoDB connection...');
  console.log('MongoDB URI:', url.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); //Hide password in logs
  
  try {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    
    console.log(`✓ Connected to MongoDB database: ${dbName}`);
    
    //Create indexes for better performance
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ token: 1 });
    await db.collection('recipes').createIndex({ author: 1 });
    
    console.log('✓ Database indexes created');
    
    return db;
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error.message);
    throw error;
  }
}

//Get database instance
function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
}

//User functions
async function createUser(email, password, userName) {
  console.log(`Creating user: ${email}, userName: ${userName}`);
  
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: uuid(),
    email: email,
    userName: userName,
    password: passwordHash,
    token: uuid(),
    createdAt: new Date().toISOString()
  };
  
  const database = getDB();
  const result = await database.collection('users').insertOne(user);
  console.log(`✓ User created with ID: ${result.insertedId}`);
  
  return user;
}

async function findUser(email) {
  const database = getDB();
  return await database.collection('users').findOne({ email: email });
}

async function findUserByToken(token) {
  const database = getDB();
  return await database.collection('users').findOne({ token: token });
}

async function updateUser(email, updates) {
  const database = getDB();
  const result = await database.collection('users').updateOne(
    { email: email },
    { $set: updates }
  );
  return result.modifiedCount > 0;
}

//Recipe functions
async function createRecipe(recipeData) {
  const database = getDB();
  const recipe = {
    recipeId: Date.now(),
    ...recipeData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await database.collection('recipes').insertOne(recipe);
  return recipe;
}

async function findRecipesByAuthor(author) {
  const database = getDB();
  return await database.collection('recipes').find({ author: author }).toArray();
}

async function findRecipeById(recipeId, author) {
  const database = getDB();
  return await database.collection('recipes').findOne({ 
    recipeId: parseInt(recipeId), 
    author: author 
  });
}

async function updateRecipe(recipeId, author, updates) {
  const database = getDB();
  const result = await database.collection('recipes').updateOne(
    { recipeId: parseInt(recipeId), author: author },
    { 
      $set: {
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }
  );
  return result.modifiedCount > 0;
}

async function deleteRecipe(recipeId, author) {
  const database = getDB();
  const result = await database.collection('recipes').deleteOne({ 
    recipeId: parseInt(recipeId), 
    author: author 
  });
  return result.deletedCount > 0;
}

//Ingredient functions
async function getAllIngredients() {
  const database = getDB();
  return await database.collection('ingredients').find({}).toArray();
}

async function findIngredient(name) {
  const database = getDB();
  return await database.collection('ingredients').findOne({ 
    name: { $regex: new RegExp(`^${name}$`, 'i') } //Case-insensitive search
  });
}

async function createIngredient(ingredientData) {
  const database = getDB();
  const ingredient = {
    ingredientId: Date.now() + Math.floor(Math.random() * 1000),
    ...ingredientData
  };
  
  await database.collection('ingredients').insertOne(ingredient);
  return ingredient;
}

module.exports = {
  connectDB,
  getDB,
  //User operations
  createUser,
  findUser,
  findUserByToken,
  updateUser,
  //Recipe operations
  createRecipe,
  findRecipesByAuthor,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
  //Ingredient operations
  getAllIngredients,
  findIngredient,
  createIngredient
};
