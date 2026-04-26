# Backend Documentation
## Setting Up the Backend
To get the backend running, follow these steps:

1. Run `npm i`
2. Set up your `.env` file
3. Set up the database
4. Run `npm start`

### Installing Packages
Before the backend can function properly, all required packages must be installed.

Navigate to the server folder and run:

`npm i`

This installs all dependencies listed in the package.json file.

### Setting Up The .env File
Create a .env file in the server folder. Use the following template:

``` conf
# DB Config envs
DB_NAME=          # Defaults to recipedb
DB_HOST=          # Defaults to localhost
DB_PASSWORD=      # Does not have a default
DB_USER=          # Defaults to root

# Token Secret env
JWT_SECRET=       # Does not have a default

# Server Port env
PORT=             # Defaults to 5001

# Frontend URI env
FRONTENDURI=      # Defaults to http://localhost:3000
```

Ensure that the environment variables align with your MySQL and frontend setup.

### Setting Up the Database
This server uses MySQL. Download the latest version and configure it according to your environment. Make sure the database credentials in your `.env` file match your MySQL setup.

Once configured, run the following script to create the database and its tables:

`npm run updateTables`

This script handles the full database and table creation process.

#### Optional Development Scripts
`npm run createData` - Fills the database with dummy data for testing.

`npm run deleteData` - Deletes all data from every table. Useful for resetting the database during development.

Note: These scripts are intended for development only and should not be used in production.

### Starting the Backend Server
Once everything is set up, start the server with:

`npm start`

The backend will begin listening for API calls on the specified port.

## Security Implementations
### JWT & Cookie Authentication
User authentication is handled using JSON Web Tokens (JWT) in conjunction with HTTP cookies.

Upon login, a token is generated containing the user's userId.

This token is returned to the client in a HTTP cookie and must be included with all subsequent requests.

The server uses this token to verify the user’s identity and ensure they have the necessary permissions to access the requested resources.

### Prepared Statements
All SQL queries use prepared statements to mitigate the risk of SQL injection attacks.

### CORS

### Input Sanitization