// src/models/Recipe.js

/**
 * Creates a new Recipe object with the given properties
 * @param {Object} recipeData - Raw recipe data, potentially from an API
 * @returns {Object} A Recipe object formatted for front-end use
 */
export function createRecipe(recipeData) {
    return {
      id: recipeData.id || recipeData.recipeID || null,
      title: recipeData.title || '',
      description: recipeData.description || '',
      ingredients: Array.isArray(recipeData.ingredients) 
        ? recipeData.ingredients 
        : [], // Ensure ingredients is always an array
      instructions: Array.isArray(recipeData.instructions)
        ? recipeData.instructions
        : recipeData.instructions?.split('\n') || [], // Handle string to array conversion
      notes: recipeData.notes || '',
      createdAt: recipeData.createdAt || new Date().toISOString(),
      updatedAt: recipeData.updatedAt || new Date().toISOString()
    };
  }
  
  /**
   * Validates a recipe object
   * @param {Object} recipe - The recipe to validate
   * @returns {Object} An object with isValid and errors properties
   */
  export function validateRecipe(recipe) {
    const errors = {};
    
    if (!recipe.title || recipe.title.trim() === '') {
      errors.title = 'Title is required';
    }
    
    if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
      errors.ingredients = 'At least one ingredient is required';
    }
    
    if (!Array.isArray(recipe.instructions) || recipe.instructions.length === 0) {
      errors.instructions = 'At least one instruction is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
  
  /**
   * Creates a blank recipe template for new recipe creation
   * @returns {Object} An empty recipe object
   */
  export function createBlankRecipe() {
    return {
      id: null,
      title: '',
      description: '',
      ingredients: [],
      instructions: [],
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }