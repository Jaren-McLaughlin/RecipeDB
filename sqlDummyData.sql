-- Insert Users 
INSERT INTO User (userName, email, passwordHash) VALUES
('JohnDoe', 'john.doe@example.com', 'hashedpassword1'),
('JaneSmith', 'jane.smith@example.com', 'hashedpassword2'),
('BobJohnson', 'bob.johnson@example.com', 'hashedpassword3');

-- Insert Recipes 
INSERT INTO Recipe (title, instructions, notes, userID) VALUES
('Spaghetti Bolognese', 'Boil pasta. \r\n Cook meat and tomato sauce.', 'Best served with garlic bread.', 1),
('Chicken Curry', 'Fry chicken. \r\n Add curry paste and coconut milk.', 'Serve with rice.', 2),
('Chocolate Cake', 'Mix ingredients. \r\n Bake at 350°F for 30 minutes.', 'Use dark chocolate for rich flavor.', 3);

-- Insert Ingredients 
INSERT INTO Ingredients (name, measurement, userID) VALUES
('Spaghetti', 'grams', 1),
('Tomato Sauce', 'cups', 1),
('Ground Beef', 'grams', 1),
('Chicken Breast', 'pieces', 2),
('Curry Paste', 'tablespoons', 2),
('Coconut Milk', 'cans', 2),
('Flour', 'cups', 3),
('Sugar', 'cups', 3),
('Cocoa Powder', 'tablespoons', 3),
('Eggs', 'pieces', 3);

-- Insert UsedIn 
INSERT INTO UsedIn (recipeID, ingredientID, quantity, unit) VALUES
(1, 1, '200', 'grams'),
(1, 2, '2', 'cups'),
(1, 3, '300', 'grams'),
(2, 4, '2', 'pieces'),
(2, 5, '3', 'tablespoons'),
(2, 6, '1', 'can'),
(3, 7, '1', 'cup'),
(3, 8, '1', 'cup'),
(3, 9, '3', 'tablespoons'),
(3, 10, '2', 'pieces');

-- Insert Shares 
INSERT INTO Shares (userID_1, userID_2) VALUES
(1, 2),
(2, 3),
(3, 1);


-- Delete Shares
DELETE FROM Shares WHERE userID_1 = 1 AND SharesuserID_2 = 2;
DELETE FROM Shares WHERE userID_1 = 2 AND SharesuserID_2 = 3;
DELETE FROM Shares WHERE userID_1 = 3 AND SharesuserID_2 = 1;

-- Delete UsedIn (Ingredients used in Recipes)
DELETE FROM UsedIn WHERE recipeID = 1 AND Name = 'Spaghetti';
DELETE FROM UsedIn WHERE recipeID = 1 AND Name = 'Tomato Sauce';
DELETE FROM UsedIn WHERE recipeID = 1 AND Name = 'Ground Beef';
DELETE FROM UsedIn WHERE recipeID = 2 AND Name = 'Chicken Breast';
DELETE FROM UsedIn WHERE recipeID = 2 AND Name = 'Curry Paste';
DELETE FROM UsedIn WHERE recipeID = 2 AND Name = 'Coconut Milk';
DELETE FROM UsedIn WHERE recipeID = 3 AND Name = 'Flour';
DELETE FROM UsedIn WHERE recipeID = 3 AND Name = 'Sugar';
DELETE FROM UsedIn WHERE recipeID = 3 AND Name = 'Cocoa Powder';
DELETE FROM UsedIn WHERE recipeID = 3 AND Name = 'Eggs';

-- Delete Recipes
DELETE FROM Recipe WHERE recipeID = 1;
DELETE FROM Recipe WHERE recipeID = 2;
DELETE FROM Recipe WHERE recipeID = 3;

-- Delete Users
DELETE FROM User WHERE userID = 1;
DELETE FROM User WHERE userID = 2;
DELETE FROM User WHERE userID = 3;

-- Delete Ingredients
DELETE FROM Ingredients WHERE Name = 'Spaghetti';
DELETE FROM Ingredients WHERE Name = 'Tomato Sauce';
DELETE FROM Ingredients WHERE Name = 'Ground Beef';
DELETE FROM Ingredients WHERE Name = 'Chicken Breast';
DELETE FROM Ingredients WHERE Name = 'Curry Paste';
DELETE FROM Ingredients WHERE Name = 'Coconut Milk';
DELETE FROM Ingredients WHERE Name = 'Flour';
DELETE FROM Ingredients WHERE Name = 'Sugar';
DELETE FROM Ingredients WHERE Name = 'Cocoa Powder';
DELETE FROM Ingredients WHERE Name = 'Eggs';
