
----------
# RecipeDB
**RecipeDB**  is  a  full-stack  web  application  designed  to  help  users  manage,  store, and share personal recipes in a clean, modern, and user-friendly interface. This application uses a Node.js/Express backend, a React frontend with Material UI for a polished UI (including dark mode), and a MySQL database to persist data.
## Table of Contents

-  Overview
-  File  Structure
-  Detailed  Explanation
-  Client  (Front-End)
-  Server  (Back-End)
-  Root-Level  Files
-  Getting  Started
-  Project  Workflow
-  Contributing
-  License
-  Contact
## Overview
RecipeDB  lets  users  create  an  account,  manage  their  personal  recipes,  and  share  them  with  others.  The  application  is  built  using:
-  **Node.js  and  Express**  for  the  server-side  API.
-  **React**  with  **Material  UI  (MUI)**  for  a  modern  and  responsive  front-end.
-  **MySQL**  for  the  relational  database.
The  project  follows  a  Model-View-Controller  (MVC)  pattern  on  the  server  to  maintain  a  clear  separation  of  concerns,  making  the  codebase  scalable  and  maintainable.
## File Structure
```
RecipeDB/  # Root project directory

├──  client/  # Front-end React application
│  ├──  public/
│  │  └──  index.html  # Main HTML file

│  ├──  src/
│  │  ├──  components/  # Reusable UI components (e.g., Header, RecipeCard)
│  │  │  ├──  Header.js
│  │  │  └──  RecipeCard.js
│  │  ├──  pages/  # Page-level components (views)
│  │  │  ├──  Dashboard.js
│  │  │  ├──  RecipeView.js
│  │  │  ├──  Login.js
│  │  │  └──  Register.js
│  │  ├──  theme.js  # Material UI theme configuration (light/dark modes)
│  │  ├──  App.js  # Main App component
│  │  └──  index.js  # React entry point
│  ├──  package.json  # Front-end dependencies and scripts
│  └──  README.md  # Client-specific documentation

├──  server/  # Back-end Node/Express application

│  ├──  controllers/  # Controller functions handling business logic
│  │  ├──  authController.js
│  │  ├──  recipeController.js
│  │  └──  userController.js

│  ├──  models/  # Database models/ORM definitions
│  │  ├──  User.js
│  │  ├──  Recipe.js
│  │  ├──  Ingredient.js
│  │  └──  Share.js

│  ├──  routes/  # Express route definitions for APIs
│  │  ├──  authRoutes.js
│  │  ├──  recipeRoutes.js
│  │  └──  userRoutes.js

│  ├──  middleware/  # Express middleware (authentication, error handling, etc.)
│  │  ├──  authMiddleware.js
│  │  └──  errorHandler.js

│  ├──  config/  # Configuration files (database connection, environment variables)
│  │  └──  db.js  # MySQL connection setup
│  ├──  server.js  # Main entry point for the Express server
│  ├──  package.json  # Back-end dependencies and scripts
│  └──  .env  # Environment variables (e.g., DB credentials, JWT secrets)

├──  .gitignore  # Files and folders to ignore in version control
└──  README.md  # Overall project documentation and instructions
```
## Detailed Explanation

### Client (Front-End)
Directory  structure  matching  project's  current  state:
```
recipe-master/

	├──  public/
	│  ├──  favicon.ico
	│  ├──  index.html
	│  ├──  logo192.png
	│  ├──  logo512.png
	│  ├──  manifest.json
	│  └──  robots.txt

	src/
		├──  components/
		│  ├──  Navbar.jsx  # Navigation bar component
		│  ├──  PasswordPolicy.jsx  # Password validation UI
		│  ├──  RecipeCard.jsx  # Recipe display card component
		│  └──  ShareModal.jsx  # Recipe sharing dialog

		├──  pages/
		│  ├──  AddEditRecipe.jsx  # Create/update recipe form
		│  ├──  Dashboard.jsx  # Main recipe grid view
		│  ├──  Login.jsx  # Authentication form
		│  ├──  Profile.jsx  # User settings page
		│  ├──  Register.jsx  # Account creation form
		│  └──  SharedRecipes.jsx  # Shared recipes list

		├──  styles/
		│  └──  index.css  # Global CSS styles

	├──  App.js  # Root component + routing
	├──  index.js  # React entry point
	└──  NavigationContext.js  # State management for navigation

```
Key  File  Purposes:
-  **components/**:  Reusable  UI  elements  (Navbar,  RecipeCard,  etc)
-  **pages/**:  Full-screen  views  for  different  app  sections
-  **styles/index.css**:  Centralized  styling  (fonts,  colors,  animations)
-  **NavigationContext.js**:  Manages  page  navigation  state
-  **App.js**:  Combines  components/pages  and  manages  app  state
### Server (Back-End)
-  **controllers/:**
Contains  files  that  handle  the  business  logic.  Controllers  process  incoming  HTTP  requests,  interact  with  the  models  (data  layer),  and  return  responses.

-  **authController.js:**  Manages  authentication  logic  such  as  login,  registration,  and  logout.
-  **recipeController.js:**  Handles  recipe-related  operations  like  creating,  retrieving,  updating,  and  deleting  recipes.
-  **userController.js:**  Manages  user-specific  operations  (e.g.,  updating  user  profiles).
-  **models/:**
Defines  the  structure  and  behavior  of  the  application’s  data.  Models  abstract  the  database  layer  and  encapsulate  data  validation  and  CRUD  operations.
-  **User.js:**  Defines  the  user  schema  and  methods  to  interact  with  user  data  in  the  database.
-  **Recipe.js:**  Represents  recipes,  including  fields  like  title  and  instructions,  and  methods  to  manage  recipe  data.
-  **Ingredient.js:**  Describes  the  structure  for  ingredients  associated  with  recipes.
-  **Share.js:**  Handles  data  related  to  sharing  recipes  between  users.
-  **routes/:**
Maps  HTTP  endpoints  to  the  corresponding  controller  functions.  This  layer  decouples  URL  definitions  from  business  logic.
-  **authRoutes.js:**  Defines  endpoints  such  as  `/api/auth/register`  and  `/api/auth/login`.
-  **recipeRoutes.js:**  Sets  up  routes  for  recipe  operations  (e.g.,  GET,  POST,  PUT,  DELETE  at  `/api/recipes`).
-  **userRoutes.js:**  Manages  routes  for  user-related  actions.
-  **middleware/:**
Includes  middleware  functions  that  run  during  request  processing.  These  functions  can  handle  tasks  like  authentication,  logging,  or  error  handling.
-  **authMiddleware.js:**  Validates  user  authentication  tokens  to  secure  routes.
-  **errorHandler.js:**  Provides  centralized  error  handling  to  ensure  consistent  responses  on  errors.
-  **config/:**
Contains  configuration  files  that  centralize  settings  such  as  the  database  connection.
-  **db.js:**  Establishes  the  connection  to  your  MySQL  database,  using  credentials  and  parameters  stored  in  the  `.env`  file.
-  **server.js:**
The  main  entry  point  for  the  Express  server.  It  initializes  the  app,  applies  middleware,  sets  up  API  routes,  and  starts  the  server.
-  **server/package.json:**
Manages  server-side  dependencies,  scripts  for  running  the  Node/Express  server,  and  related  project  metadata.
-  **server/.env:**
Stores  environment-specific  variables  (e.g.,  database  credentials,  JWT  secrets).  This  file  is  critical  for  keeping  sensitive  data  out  of  your  codebase.
### Root-Level Files
-  **.gitignore:**
Lists  files  and  directories  that  should  be  excluded  from  version  control  (e.g.,  `node_modules`,  local  configuration  files).
-  **README.md:**
Provides  overall  project  documentation,  instructions  for  setup  and  development,  and  an  overview  of  the  project  structure  and  workflow.
## Project Workflow
-  **Client-Server  Interaction:**
The  React  front  end  communicates  with  the  Express  server  via  API  endpoints  defined  in  the  routes.  Controllers  process  these  requests  and  interact  with  models  to  retrieve  or  update  data.
-  **MVC  Pattern  on  the  Server:**
The  server  follows  the  MVC  pattern:
-  **Models:**  Define  data  structures  and  database  interactions.
-  **Controllers:**  Handle  business  logic  and  process  requests.
-  **Routes:**  Map  HTTP  endpoints  to  controller  functions.
-  **Middleware:**
- 
Middleware  functions  handle  authentication,  logging,  and  error  handling,  ensuring  that  cross-cutting  concerns  are  managed  in  a  centralized  manner.