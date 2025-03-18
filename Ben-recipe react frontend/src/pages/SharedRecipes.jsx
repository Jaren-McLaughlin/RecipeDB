import React from 'react'; // Add this import
import { useNavigation } from '../NavigationContext';

const sharedRecipes = [
  { title: "Pasta Carbonara", sharer: "Maria" },
  { title: "Vegan Bowl", sharer: "Alex" }
];

export default function SharedRecipes() {
  const { showPage } = useNavigation();

  return (
    <div className="page active"> {/* Add 'active' class here */}
      <div className="auth-form">
        <h2>Shared Recipes 👥</h2>
        <div className="shared-list">
          {sharedRecipes.map((recipe, index) => (
            <div 
              key={index} 
              className="shared-recipe" 
              onClick={() => showPage('edit-recipe')}
            >
              <div className="shared-content">
                <h4 className="recipe-title">{recipe.title}</h4>
                <p className="sharer">Shared by {recipe.sharer}</p>
                <i className="fas fa-external-link-alt"></i>
              </div>
            </div>
          ))}
        </div>
        <button className="btn" onClick={() => showPage('dashboard')}>
          Return
        </button>
      </div>
    </div>
  );
}