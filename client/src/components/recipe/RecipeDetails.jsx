

/**
 * Displays detailed information about a recipe.
 * @memberof Recipe
 * @function RecipeDetails
 * @param {Object} props - Component properties
 * @param {Object} props.recipe - Recipe data object
 * @param {string} props.recipe.title - Recipe title
 * @param {Array<string>} props.recipe.ingredients - List of ingredients
 * @param {Array<string>} props.recipe.instructions - List of instructions
 * @param {string} [props.recipe.notes] - Additional notes about the recipe
 * @returns {JSX.Element} Recipe details component
 * @example
 * const recipe = {
 *   title: "Chocolate Cake",
 *   ingredients: ["2 cups flour", "1 cup sugar", "1/2 cup cocoa"],
 *   instructions: ["Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes"],
 *   notes: "Best served with vanilla ice cream"
 * };
 * 
 * <RecipeDetails recipe={recipe} />
 */


import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

function RecipeDetails({ recipe }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          {recipe.title}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Ingredients
        </Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText 
                primary={`${ingredient.quantity} ${ingredient.measurement} ${ingredient.name}`}
              />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Instructions
        </Typography>
        <List>
          {recipe.instructions.map((step, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText 
                primary={`Step ${index + 1}`} 
                secondary={step} 
              />
            </ListItem>
          ))}
        </List>
        
        {recipe.notes && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <Typography variant="body1">
              {recipe.notes}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default RecipeDetails;