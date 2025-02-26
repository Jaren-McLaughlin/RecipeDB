CREATE TABLE User
(
  userID INT NOT NULL,
  userName INT NOT NULL,
  email INT NOT NULL,
  passwordHash INT NOT NULL,
  PRIMARY KEY (userID),
  UNIQUE (email)
);

CREATE TABLE Recipe
(
  recipeID INT NOT NULL,
  title INT NOT NULL,
  instructions INT NOT NULL,
  notes INT,
  userID INT NOT NULL,
  PRIMARY KEY (recipeID),
  FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE Ingredients
(
  Name INT NOT NULL,
  Measurement INT NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE UsedIn
(
  Quantity INT NOT NULL,
  recipeID INT NOT NULL,
  Name INT NOT NULL,
  PRIMARY KEY (recipeID, Name),
  FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID),
  FOREIGN KEY (Name) REFERENCES Ingredients(Name)
);

CREATE TABLE Shares
(
  userID_1 INT NOT NULL,
  SharesuserID_2 INT NOT NULL,
  PRIMARY KEY (userID_1, SharesuserID_2),
  FOREIGN KEY (userID_1) REFERENCES User(userID),
  FOREIGN KEY (SharesuserID_2) REFERENCES User(userID)
);