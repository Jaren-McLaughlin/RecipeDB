// server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const recipeRoutes = require(`./routes/recipesRoutes`);
const authRoutes = require(`./routes/authRoutes`);
const userRoutes = require(`./routes/usersRoutes`)
const app = express();
const cookieParser = require('cookie-parser');

// Middleware
app.use(cors({
  origin: process.env.FRONTENDURI || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Simple test route
app.get('/api/test', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.json({ message: 'API is working!' });
});

// Routes will be added here later
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});