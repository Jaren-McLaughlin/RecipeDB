CREATE TABLE User (
  userID SERIAL PRIMARY KEY,
  userName VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwordHash VARCHAR(64) NOT NULL,
  UNIQUE (email)
);

CREATE TABLE Recipe (
  recipeID SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  instructions VARCHAR(5000) NOT NULL,
  notes VARCHAR(1000),
  userID BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE
);

CREATE TABLE Ingredients (
  ingredientID SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  measurement VARCHAR(50), 
  userID BIGINT UNSIGNED, 
  UNIQUE(name),
  FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE SET NULL
);

CREATE TABLE UsedIn (
  recipeID BIGINT UNSIGNED NOT NULL,
  ingredientID BIGINT UNSIGNED NOT NULL,
  quantity VARCHAR(255) NOT NULL,
  PRIMARY KEY (recipeID, ingredientID),
  FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID) ON DELETE CASCADE,
  FOREIGN KEY (ingredientID) REFERENCES Ingredients(ingredientID) ON DELETE CASCADE
);

CREATE TABLE Shares (
  userID_1 BIGINT UNSIGNED NOT NULL,
  userID_2 BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (userID_1, userID_2),
  FOREIGN KEY (userID_1) REFERENCES User(userID) ON DELETE CASCADE,
  FOREIGN KEY (userID_2) REFERENCES User(userID) ON DELETE CASCADE
);
