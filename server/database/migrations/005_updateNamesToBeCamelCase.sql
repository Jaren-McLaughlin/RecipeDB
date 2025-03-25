-- Rename user table columns
ALTER TABLE user RENAME COLUMN userID TO userId;
ALTER TABLE user RENAME COLUMN passwordHash TO `password`;

-- Rename recipe table columns
ALTER TABLE recipe RENAME COLUMN recipeID TO recipeId;
ALTER TABLE recipe RENAME COLUMN userID TO userId;

-- Rename ingredients table columns
RENAME TABLE ingredients TO ingredient;
ALTER TABLE ingredient RENAME COLUMN ingredientID TO ingredientId;
ALTER TABLE ingredient RENAME COLUMN userID TO userId;

-- Rename usedIn table columns
ALTER TABLE usedIn RENAME COLUMN recipeID TO recipeId;
ALTER TABLE usedIn RENAME COLUMN ingredientID TO ingredientId;

-- Rename shares table columns
RENAME TABLE shares TO sharing;
ALTER TABLE sharing RENAME COLUMN userID_1 TO userId1;
ALTER TABLE sharing RENAME COLUMN userID_2 TO userId2;
