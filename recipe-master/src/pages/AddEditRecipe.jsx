
import React from 'react';

import { useNavigation } from '../NavigationContext';

export default function AddEditRecipe() {
  const { showPage } = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    showPage('dashboard');
  };

  return (
    <div className="page active"> {/* Add 'active' class here */}
      <div className="auth-form">
        <h2>New Recipe 🍳</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-input" placeholder="Recipe Title" required />
          <textarea className="form-input" placeholder="Ingredients" rows="4" required />
          <textarea className="form-input" placeholder="Instructions" rows="8" required />
          <button className="btn" type="submit">Save Recipe</button>
          <button 
            type="button" 
            className="btn" 
            onClick={(e) => {
              e.preventDefault();
              showPage('dashboard');
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}