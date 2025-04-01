CREATE OR REPLACE VIEW getRecipeDetails AS
SELECT  
    recipe.userId,
    recipe.recipeId,
    recipe.title, 
    recipe.instructions, 
    recipe.notes,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', ingredient.name,
            'quantity', usedIn.quantity,
            'measurement', ingredient.measurement
        )
    ) AS ingredient
FROM recipe
LEFT JOIN usedIn ON recipe.recipeId = usedIn.recipeId 
LEFT JOIN ingredient ON usedIn.ingredientId = ingredient.ingredientId
GROUP BY 
    recipe.userId,
    recipe.recipeId, 
    recipe.title, 
    recipe.instructions, 
    recipe.notes;