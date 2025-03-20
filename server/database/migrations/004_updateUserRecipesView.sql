DROP VIEW IF EXISTS userRecipes;
CREATE VIEW getRecipeList AS
SELECT User.userID, recipeID, title, userName
FROM Recipe
INNER JOIN User
ON Recipe.userID = User.userID;