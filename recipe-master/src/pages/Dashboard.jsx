import { useState } from 'react';
import React from 'react';
import { useNavigation } from '../NavigationContext';
import RecipeCard from '../components/RecipeCard';

const fakeRecipes = [
  {
    title: "Classic Spaghetti Bolognese",
    ingredients: "🍝 Ground beef, tomatoes, herbs, eggs, tomato, humans",
    time: "45 mins"
  },
  {
    title: "Chocolate Cake",
    ingredients: "🍫 Rich & moist layered cake",
    time: "60 mins"
  }
];

export default function Dashboard({ showShareModal }) {
  const { showPage } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="page active">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="add-btn" onClick={() => showPage('add-recipe')}>
          <i className="fas fa-plus"></i> Add Recipe
        </button>
      </div>
      <div className="recipe-grid">
        {fakeRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            {...recipe}
            onShare={showShareModal}
            onEdit={() => showPage('edit-recipe')}
            onDelete={() => alert('Delete recipe?')}
          />
        ))}
      </div>
    </div>
  );
}