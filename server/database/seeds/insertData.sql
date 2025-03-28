-- Insert Users 
INSERT INTO user (userName, email, `password`) VALUES
('JohnDoe', 'john.doe@example.com', 'hashedpassword1'),
('JaneSmith', 'jane.smith@example.com', 'hashedpassword2'),
('BobJohnson', 'bob.johnson@example.com', 'hashedpassword3');

-- Insert Recipes 
INSERT INTO recipe (title, instructions, notes, userId) VALUES
('Spaghetti Bolognese', 'Boil pasta. \r\n Cook meat and tomato sauce.', 'Best served with garlic bread.', 1),
('Chicken Curry', 'Fry chicken. \r\n Add curry paste and coconut milk.', 'Serve with rice.', 2),
('Chocolate Cake', 'Mix ingredients. \r\n Bake at 350°F for 30 minutes.', 'Use dark chocolate for rich flavor.', 3);

-- Insert Ingredients 
INSERT INTO ingredient (name, measurement, userId) VALUES
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
INSERT INTO usedIn (recipeId, ingredientId, quantity) VALUES
(1, 1, '200'),
(1, 2, '2'),
(1, 3, '300'),
(2, 4, '2'),
(2, 5, '3'),
(2, 6, '1'),
(3, 7, '1'),
(3, 8, '1'),
(3, 9, '3'),
(3, 10, '2');

-- Insert Shares 
INSERT INTO sharing (userId1, userId2) VALUES
(1, 2),
(2, 3),
(3, 1);