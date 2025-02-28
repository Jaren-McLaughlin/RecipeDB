CREATE TABLE User (
  userID SERIAL PRIMARY KEY,
  userName VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  passwordHash VARCHAR NOT NULL,
  UNIQUE (email)
);

CREATE TABLE Recipe (
  recipeID SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  instructions VARCHAR NOT NULL,
  notes VARCHAR,
  userID INT NOT NULL,
  FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE
);

CREATE TABLE Ingredients (
  ingredientID SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  measurement VARCHAR, 
  userID INT, 
  UNIQUE(name),
  FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE SET NULL
);

CREATE TABLE UsedIn (
  recipeID INT NOT NULL,
  ingredientID INT NOT NULL,
  quantity VARCHAR NOT NULL,
  unit VARCHAR,
  PRIMARY KEY (recipeID, ingredientID),
  FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID) ON DELETE CASCADE,
  FOREIGN KEY (ingredientID) REFERENCES Ingredients(ingredientID) ON DELETE CASCADE
);

CREATE TABLE Shares (
  userID_1 INT NOT NULL,
  userID_2 INT NOT NULL,
  PRIMARY KEY (userID_1, userID_2),
  FOREIGN KEY (userID_1) REFERENCES User(userID) ON DELETE CASCADE,
  FOREIGN KEY (userID_2) REFERENCES User(userID) ON DELETE CASCADE
);
