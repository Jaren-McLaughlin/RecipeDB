ALTER TABLE Ingredients DROP INDEX name;
ALTER TABLE Ingredients DROP FOREIGN KEY ingredients_ibfk_1;
ALTER TABLE Ingredients 
ADD CONSTRAINT fk_ingredient_user 
FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE;

DROP VIEW IF EXISTS singleRecipe;
CREATE VIEW getRecipeDetails AS
SELECT  
    Recipe.recipeID, 
    Recipe.title, 
    Recipe.instructions, 
    Recipe.notes, 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', Ingredients.name,
            'quantity', UsedIn.quantity,
            'measurement', Ingredients.measurement
        )
    ) AS ingredients
FROM Recipe
INNER JOIN UsedIn ON Recipe.recipeID = UsedIn.recipeID 
INNER JOIN Ingredients ON UsedIn.ingredientID = Ingredients.ingredientID
GROUP BY 
    Recipe.recipeID, 
    Recipe.title, 
    Recipe.instructions, 
    Recipe.notes;