require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'recipemaster';

async function testConnection() {
  console.log('Testing MongoDB connection...');
  console.log('Connection string:', url.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide password
  
  try {
    const client = new MongoClient(url);
    console.log('Attempting to connect...');
    
    await client.connect();
    console.log('✓ Successfully connected to MongoDB!');
    
    const db = client.db(dbName);
    console.log(`✓ Connected to database: ${dbName}`);
    
    //List all collections
    const collections = await db.listCollections().toArray();
    console.log('Collections found:', collections.map(c => c.name));
    
    //Try to insert a test user
    console.log('\nTesting user insertion...');
    const testUser = {
      email: 'test@test.com',
      userName: 'TestUser',
      password: 'hashedpassword123',
      token: 'testtoken123',
      createdAt: new Date().toISOString()
    };
    
    const result = await db.collection('users').insertOne(testUser);
    console.log('✓ Test user inserted with ID:', result.insertedId);
    
    //Count users
    const count = await db.collection('users').countDocuments();
    console.log('Total users in database:', count);
    
    //Clean up test user
    await db.collection('users').deleteOne({ email: 'test@test.com' });
    console.log('✓ Test user cleaned up');
    
    await client.close();
    console.log('\n✓ Connection test successful!');
    
  } catch (error) {
    console.error('✗ Connection failed:', error.message);
    console.error('\nFull error:', error);
  }
}

testConnection();
