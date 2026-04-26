CREATE OR REPLACE VIEW getRecipeList AS
SELECT user.userId, recipeId, title, userName
FROM recipe
INNER JOIN user
ON recipe.userId = user.userId;

CREATE OR REPLACE VIEW getRecipeDetails AS
SELECT  
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
INNER JOIN usedIn ON recipe.recipeId = usedIn.recipeId 
INNER JOIN ingredient ON usedIn.ingredientId = ingredient.ingredientId
GROUP BY 
    recipe.recipeId, 
    recipe.title, 
    recipe.instructions, 
    recipe.notes;

DROP VIEW IF EXISTS UserProfileView;
CREATE VIEW getUserDetails AS
SELECT userId, userName, email 
FROM user;

CREATE VIEW getIngredients AS
SELECT ingredientId, name, measurement
FROM ingredient;

CREATE VIEW getUserPassword AS
SELECT userId, `password`
FROM user;

CREATE VIEW getSharing AS
SELECT userId1, userId2
FROM sharing;