-- View User Recipes
CREATE VIEW userRecipes AS
SELECT recipeID, title, userName
FROM Recipe
INNER JOIN User
ON Recipe.userID = User.userID

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
