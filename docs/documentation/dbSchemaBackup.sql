CREATE VIEW getingredients AS select ingredient.ingredientId AS ingredientId,
ingredient.name AS name,
ingredient.measurement AS measurement,
ingredient.userId AS userId from ingredient

CREATE VIEW getlogindetails AS select user.userId AS userId,
user.password AS password,
user.email AS email from user

CREATE VIEW getrecipedetails AS select recipe.userId AS userId,
recipe.recipeId AS recipeId,
recipe.title AS title,
recipe.instructions AS instructions,
recipe.notes AS notes,
json_arrayagg(json_object('name',
ingredient.name,
'quantity',
usedin.quantity,
'measurement',
ingredient.measurement)) AS ingredient from ((recipe left join usedin on((recipe.recipeId = usedin.recipeId))) left join ingredient on((usedin.ingredientId = ingredient.ingredientId))) group by recipe.userId,
recipe.recipeId,
recipe.title,
recipe.instructions,
recipe.notes

CREATE VIEW getrecipelist AS select user.userId AS userId,
recipe.recipeId AS recipeId,
recipe.title AS title,
user.userName AS userName from (recipe join user on((recipe.userId = user.userId)))

CREATE VIEW getuserdetails AS select user.userId AS userId,
user.userName AS userName,
user.email AS email from user

CREATE TABLE `ingredient` (
  `ingredientId` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `measurement` varchar(50) DEFAULT NULL,
  `userId` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`ingredientId`),
  UNIQUE KEY `ingredientID` (`ingredientId`),
  UNIQUE KEY `uniqueUserIngredient` (`name`,`measurement`,`userId`),
  KEY `fk_ingredient_user` (`userId`),
  CONSTRAINT `fk_ingredient_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
)

CREATE TABLE `recipe` (
  `recipeId` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `instructions` varchar(5000) NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `userId` bigint unsigned NOT NULL,
  PRIMARY KEY (`recipeId`),
  UNIQUE KEY `recipeID` (`recipeId`),
  KEY `userID` (`userId`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
)

CREATE VIEW recipedashboard AS select r.recipeId AS recipeID,
r.title AS title,
u.userName AS userName,
(select count(0) from usedin where (usedin.recipeId = r.recipeId)) AS ingredientCount from (recipe r join user u on((r.userId = u.userId)))

CREATE VIEW recipesearch AS select recipe.recipeId AS recipeID,
recipe.title AS title,
recipe.instructions AS instructions,
recipe.notes AS notes,
user.userName AS userName from (recipe join user on((recipe.userId = user.userId)))

CREATE TABLE `usedin` (
  `recipeId` bigint unsigned NOT NULL,
  `ingredientId` bigint unsigned NOT NULL,
  `quantity` float DEFAULT NULL,
  PRIMARY KEY (`recipeId`,`ingredientId`),
  KEY `ingredientID` (`ingredientId`),
  CONSTRAINT `usedin_ibfk_1` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`recipeId`) ON DELETE CASCADE,
  CONSTRAINT `usedin_ibfk_2` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient` (`ingredientId`) ON DELETE CASCADE
)

CREATE TABLE `user` (
  `userId` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userID` (`userId`),
  UNIQUE KEY `email` (`email`)
)

