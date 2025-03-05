-- View User Recipes
CREATE VIEW userRecipes AS
SELECT recipeID, title, userName
FROM Recipe
INNER JOIN User
ON Recipe.userID = User.userID