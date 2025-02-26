-- Insert Users
INSERT INTO User (userID, userName, email, passwordHash) VALUES
(1, 'JohnDoe', 'john.doe@example.com', 'hashedpassword1'),
(2, 'JaneSmith', 'jane.smith@example.com', 'hashedpassword2'),
(3, 'BobJohnson', 'bob.johnson@example.com', 'hashedpassword3');

-- Insert Recipes
INSERT INTO Recipe (recipeID, title, instructions, notes, userID) VALUES
(1, 'Spaghetti Bolognese', 'Boil pasta. \r\n Cook meat and tomato sauce.', 'Best served with garlic bread.', 1),
(2, 'Chicken Curry', 'Fry chicken. \r\n Add curry paste and coconut milk.', 'Serve with rice.', 2),
(3, 'Chocolate Cake', 'Mix ingredients. \r\n Bake at 350°F for 30 minutes.', 'Use dark chocolate for rich flavor.', 3);

-- Insert Ingredients
INSERT INTO Ingredients (Name, Measurement) VALUES
('Spaghetti', 'grams'),
('Tomato Sauce', 'cups'),
('Ground Beef', 'grams'),
('Chicken Breast', 'pieces'),
('Curry Paste', 'tablespoons'),
('Coconut Milk', 'cans'),
('Flour', 'cups'),
('Sugar', 'cups'),
('Cocoa Powder', 'tablespoons'),
('Eggs', 'pieces');

-- Insert UsedIn (Mapping recipes to ingredients)
INSERT INTO UsedIn (Quantity, recipeID, Name) VALUES
(200, 1, 'Spaghetti'),
(2, 1, 'Tomato Sauce'),
(300, 1, 'Ground Beef'),
(2, 2, 'Chicken Breast'),
(3, 2, 'Curry Paste'),
(1, 2, 'Coconut Milk'),
(1, 3, 'Flour'),
(1, 3, 'Sugar'),
(3, 3, 'Cocoa Powder'),
(2, 3, 'Eggs');

-- Insert Shares (User sharing recipes with other users)
INSERT INTO Shares (userID_1, SharesuserID_2) VALUES
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
