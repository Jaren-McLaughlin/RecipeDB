// src/components/recipe/RecipeDetails.jsx
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
        
        <Typography variant="body1" paragraph>
          {recipe.description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Ingredients
        </Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={ingredient} />
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