-- Insert Users 
INSERT INTO user (userName, email, `password`) VALUES
('JohnDoe', 'john.doe@example.com', '$2b$10$fhNuX8sgwLpZ1HPBcMPW7.xTC2QlmnzTlLDuSQVIFYUcgLOl7gqBS'); -- Hashed Password = password
SET @userId1 = LAST_INSERT_ID();

INSERT INTO user (userName, email, `password`) VALUES
('JaneSmith', 'jane.smith@example.com', '$2b$10$fhNuX8sgwLpZ1HPBcMPW7.xTC2QlmnzTlLDuSQVIFYUcgLOl7gqBS');
SET @userId2 = LAST_INSERT_ID();

INSERT INTO user (userName, email, `password`) VALUES
('BobJohnson', 'bob.johnson@example.com', '$2b$10$fhNuX8sgwLpZ1HPBcMPW7.xTC2QlmnzTlLDuSQVIFYUcgLOl7gqBS');
SET @userId3 = LAST_INSERT_ID();

-- Insert Recipes 
INSERT INTO recipe (title, instructions, notes, userId) VALUES
('Spaghetti Bolognese', 'Boil pasta. \r\n Cook meat and tomato sauce.', 'Best served with garlic bread.', @userId1);
SET @recipeId1 = LAST_INSERT_ID();

INSERT INTO recipe (title, instructions, notes, userId) VALUES
('Chicken Curry', 'Fry chicken. \r\n Add curry paste and coconut milk.', 'Serve with rice.', @userId2);
SET @recipeId2 = LAST_INSERT_ID();

INSERT INTO recipe (title, instructions, notes, userId) VALUES
('Chocolate Cake', 'Mix ingredients. \r\n Bake at 350°F for 30 minutes.', 'Use dark chocolate for rich flavor.', @userId3);
SET @recipeId3 = LAST_INSERT_ID();

-- Insert Ingredients 
INSERT INTO ingredient (name, measurement, userId) VALUES
('Spaghetti', 'grams', @userId1);
SET @ingredientId1 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Tomato Sauce', 'cups', @userId1);
SET @ingredientId2 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Ground Beef', 'grams', @userId1);
SET @ingredientId3 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Chicken Breast', 'pieces', @userId2);
SET @ingredientId4 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Curry Paste', 'tablespoons', @userId2);
SET @ingredientId5 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Coconut Milk', 'cans', @userId2);
SET @ingredientId6 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Flour', 'cups', @userId3);
SET @ingredientId7 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Sugar', 'cups', @userId3);
SET @ingredientId8 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Cocoa Powder', 'tablespoons', @userId3);
SET @ingredientId9 = LAST_INSERT_ID();

INSERT INTO ingredient (name, measurement, userId) VALUES
('Eggs', 'pieces', @userId3);
SET @ingredientId10 = LAST_INSERT_ID();

-- Insert UsedIn 
INSERT INTO usedIn (recipeId, ingredientId, quantity) VALUES
(@recipeId1, @ingredientId1, '200'),
(@recipeId1, @ingredientId2, '2'),
(@recipeId1, @ingredientId3, '300'),
(@recipeId2, @ingredientId4, '2'),
(@recipeId2, @ingredientId5, '3'),
(@recipeId2, @ingredientId6, '1'),
(@recipeId3, @ingredientId7, '1'),
(@recipeId3, @ingredientId8, '1'),
(@recipeId3, @ingredientId9, '3'),
(@recipeId3, @ingredientId10, '2');
