-- View User Recipes
CREATE VIEW userRecipes AS
SELECT recipeID, title, userName
FROM Recipe
INNER JOIN User
ON Recipe.userID = User.userID;

-- View Search for recipe
CREATE VIEW RecipeSearch AS
SELECT recipeID, title, instructions, notes, userName
FROM Recipe
INNER JOIN User ON Recipe.userID = User.userID;

-- View Search for ingredient
CREATE VIEW IngredientSearch AS
SELECT i.ingredientID, i.name, u.userName, r.title AS recipeTitle, uI.quantity
FROM Ingredients i
INNER JOIN UsedIn uI ON i.ingredientID = uI.ingredientID
INNER JOIN Recipe r ON uI.recipeID = r.recipeID
INNER JOIN User u ON r.userID = u.userID;

-- View User Profile
CREATE VIEW UserProfileView AS 
SELECT userID, userName, email 
FROM User;

-- View Individual Recipe
CREATE VIEW singleRecipe AS
SELECT 
    Recipe.recipeID, 
    Recipe.title, 
    Recipe.instructions, 
    Recipe.notes, 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'ingredientID', Ingredients.ingredientID,
            'name', Ingredients.name,
            'quantity', UsedIn.quantity,
            'measurement', Ingredients.measurement
        )
    ) AS ingredients_json
FROM Recipe
INNER JOIN UsedIn ON Recipe.recipeID = UsedIn.recipeID 
INNER JOIN Ingredients ON UsedIn.ingredientID = Ingredients.ingredientID
GROUP BY 
    Recipe.recipeID, 
    Recipe.title, 
    Recipe.instructions, 
    Recipe.notes;

-- View All Recipes
CREATE VIEW RecipeDashboard AS
SELECT r.recipeID, r.title, u.userName, 
       (SELECT COUNT(*) FROM UsedIn WHERE recipeID = r.recipeID) AS ingredientCount
FROM Recipe r
INNER JOIN User u ON r.userID = u.userID;
