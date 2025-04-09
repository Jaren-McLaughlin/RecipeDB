-- Insert Users 
INSERT INTO user (userId, userName, email, `password`) VALUES
(5000, 'JohnDoe', 'john.doe@example.com', '$2b$10$fhNuX8sgwLpZ1HPBcMPW7.xTC2QlmnzTlLDuSQVIFYUcgLOl7gqBS'), -- Hashed Password = password
(5001, 'JaneSmith', 'jane.smith@example.com', '$2b$10$fhNuX8sgwLpZ1HPBcMPW7.xTC2QlmnzTlLDuSQVIFYUcgLOl7gqBS'),
(5002, 'BobJohnson', 'bob.johnson@example.com', '$2b$10$fhNuX8sgwLpZ1HPBcMPW7.xTC2QlmnzTlLDuSQVIFYUcgLOl7gqBS');

-- Insert Recipes 
INSERT INTO recipe (recipeId, title, instructions, notes, userId) VALUES
(5000, 'Spaghetti Bolognese', 'Boil pasta. \r\n Cook meat and tomato sauce.', 'Best served with garlic bread.', 5000),
(5001, 'Chicken Curry', 'Fry chicken. \r\n Add curry paste and coconut milk.', 'Serve with rice.', 5001),
(5002, 'Chocolate Cake', 'Mix ingredients. \r\n Bake at 350°F for 30 minutes.', 'Use dark chocolate for rich flavor.', 5002);

-- Insert Ingredients 
INSERT INTO ingredient (ingredientId, name, measurement, userId) VALUES
(5000, 'Spaghetti', 'grams', 5000),
(5001, 'Tomato Sauce', 'cups', 5000),
(5002, 'Ground Beef', 'grams', 5000),
(5003, 'Chicken Breast', 'pieces', 5001),
(5004, 'Curry Paste', 'tablespoons', 5001),
(5005, 'Coconut Milk', 'cans', 5001),
(5006, 'Flour', 'cups', 5002),
(5007, 'Sugar', 'cups', 5002),
(5008, 'Cocoa Powder', 'tablespoons', 5002),
(5009, 'Eggs', 'pieces', 5002);

-- Insert UsedIn 
INSERT INTO usedIn (recipeId, ingredientId, quantity) VALUES
(5000, 5000, '200'),
(5000, 5001, '2'),
(5000, 5002, '300'),
(5001, 5003, '2'),
(5001, 5004, '3'),
(5001, 5005, '1'),
(5002, 5006, '1'),
(5002, 5007, '1'),
(5002, 5008, '3'),
(5002, 5009, '2');
