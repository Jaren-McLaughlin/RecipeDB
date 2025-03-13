import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/common/Header';
import RecipeCard from './components/recipe/RecipeCard';

function App() {
  const [message, setMessage] = useState('');

  // Dummy recipe data for testing
  const dummyRecipe = {
    id: 1,
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with a rich meaty sauce. Perfect for family dinners and easy to prepare in advance.",
  };
  
  // Dummy handler functions
  const handleEdit = (id) => {
    console.log(`Edit recipe with ID: ${id}`);
  };
  
  const handleDelete = (id) => {
    console.log(`Delete recipe with ID: ${id}`);
  };
  
  useEffect(() => {
    // Test connection to backend
    fetch('/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error connecting to backend:', error));
  }, []);
  
  return (
    <div className="App">
      <Header />
      <main style={{ padding: '1rem' }}>
        <h2>Welcome to Recipe Management Suite</h2>
        <p>Your personal recipe organization system</p>
        {message && <p>Backend connection: {message}</p>}
        
        {/* Recipe card with dummy data */}
        <RecipeCard 
          recipe={dummyRecipe} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </main>
    </div>
  );
}


export default App;