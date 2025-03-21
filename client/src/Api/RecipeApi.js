// src/api/recipeApi.js
import { createRecipe } from '../models/Recipe';

/**
 * Fetches recipes from the API and converts them to front-end model format
 * @returns {Promise<Array>} Array of recipe objects
 */
export async function fetchRecipes() {
  try {
    const response = await fetch('/api/recipes');
    const data = await response.json();
    
    // Transform API data to match your frontend model
    return data.map(apiRecipe => createRecipe({
      id: apiRecipe.recipeID,
      title: apiRecipe.title,
      description: apiRecipe.description,
      // The API might return ingredients as a string or in a different format
      ingredients: parseIngredients(apiRecipe),
      // Instructions might be a single string with newlines
      instructions: apiRecipe.instructions.split('\r\n'),
      notes: apiRecipe.notes,
      createdAt: apiRecipe.created_at,
      updatedAt: apiRecipe.updated_at
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

/**
 * Helper function to parse ingredients from API format to front-end format
 * @param {Object} apiRecipe - Raw recipe data from API
 * @returns {Array} Formatted ingredients array
 */
function parseIngredients(apiRecipe) {
  // This implementation will depend on how your API returns ingredients
  // For example, if it returns a joined string, you'll need to parse it
  if (typeof apiRecipe.ingredients === 'string') {
    return apiRecipe.ingredients.split(',').map(item => {
      const [name, quantity, unit] = item.split(':');
      return { name, quantity, unit };
    });
  }
  
  // If it's already an array but with different property names
  if (Array.isArray(apiRecipe.ingredients)) {
    return apiRecipe.ingredients.map(ing => ({
      name: ing.ingredient_name || ing.name,
      quantity: ing.amount || ing.quantity,
      unit: ing.unit || ''
    }));
  }
  
  return [];
}