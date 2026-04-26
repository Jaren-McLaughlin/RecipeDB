# Recipe Master

[My Notes](notes.md)

Recipe Master is a robust, full-stack web application designed for home chefs who want to digitize their culinary secrets. Unlike simple note-taking apps, Recipe Master provides a structured database for ingredients and instructions, allowing for precise editing and management. With real-time updates and seamless synchronization, users can manage their pantry and cookbook from any device, ensuring their favorite meals are always just a click away.

### Elevator pitch

In a world of cluttered bookmarks and lost index cards, **Recipe Master** is the ultimate digital sous-chef for the modern kitchen. It’s a streamlined, high-performance platform that lets you store, edit, and organize your personal recipe collection with the precision of a professional database. Whether you're adjusting ingredients on the fly or scaling a meal for guests, Recipe Master keeps your culinary data synchronized in real-time. It’s not just a digital cookbook; it’s a powerful management suite that ensures you never lose a "secret ingredient" again.

### Design

#### 🖥️ Main User Interface
| Public Home Page | Authenticated Dashboard |
| --- | --- |
| ![HomePage](https://github.com/user-attachments/assets/eda6bff7-5ca9-4a44-ad06-6b13bd4f8af7) | ![User Home](https://github.com/user-attachments/assets/1f8d1421-3797-467d-9e32-2dc5d9f69c5c) |

#### 📝 Recipe Management
| Edit Recipe | View Recipe Details |
| --- | --- |
| ![Edit Recipe](https://github.com/user-attachments/assets/ae06d6cc-f69b-49c8-a432-90ae876b6bd8) | ![View Recipe](https://github.com/user-attachments/assets/c53da225-7243-4fbf-81ea-37acba8493ae) |

| Delete Recipe Popup | Add Recipe Page |
| --- | --- |
| ![Delete Recipe](https://github.com/user-attachments/assets/a2b67585-b5f1-46ad-8a23-0f3a280c2a92) | ![Add Recipe](https://github.com/user-attachments/assets/faba19d3-e3e5-4e03-b50e-700db5801005) |

#### 👤 User Profile & Settings
| Profile Page | Edit Profile |
| --- | --- |
| ![Profile](https://github.com/user-attachments/assets/d3ac110c-8513-42cc-ba04-7e56de9ceaf4) | ![Edit Profile](https://github.com/user-attachments/assets/266ec592-f3c8-4448-8b1f-a561431ad2b7) |

#### 🔐 Security & Navigation
| Change Password | Top Navigation Menu |
| --- | --- |
| ![Change Password](https://github.com/user-attachments/assets/0615b77e-f7b6-45f8-92a6-ebf80732c378) | ![Navigation](https://github.com/user-attachments/assets/b59f8596-13e2-4d72-a29f-9cba02c3183e) |


The application features a responsive dashboard where recipes are displayed in a clean grid. Users can quickly search through their collection, view detailed ingredient lists, and jump into an intuitive edit mode to refine their instructions.

```mermaid
sequenceDiagram
    actor User
    actor Frontend
    actor Backend
    actor Database
    User->>Frontend: Click "Add Recipe."
    Frontend->>Backend: POST /api/recipes (JWT Token)
    Backend->>Database: INSERT INTO recipes...
    Database-->>Backend: Confirm Success
    Backend-->>Frontend: Return New Recipe Object
    Frontend->>User: Display Success Message & Update Grid

```

### Key features

* **User Authentication**: Secure login and registration system using JWT and HTTP-only cookies to protect personal recipe data.
* **CRUD Recipe Management**: Full capability to Create, Read, Update, and Delete recipes and specific ingredients within those recipes.
* **Dynamic Search & Filtering**: Real-time filtering of the recipe library via a search bar to find specific meals instantly.
* **Relational Ingredient Tracking**: A structured database approach where ingredients are linked to recipes, allowing for precise quantity and unit management.
* **Real-time Activity Feed**: A live notification system that alerts the user (or group members) when a recipe is updated or a new one is added.

### Technologies

I am going to use the required technologies in the following ways.

* **HTML** - I will use semantic HTML5 elements (header, footer, main, section) to provide a structural foundation for the React components and ensure accessibility.
* **CSS** - I will implement a responsive design using Material UI components, including a theme toggle for light and dark modes.
* **React** - The frontend will be a Single Page Application (SPA). I will use functional components, Hooks (`useState`, `useEffect`), and React Router for seamless navigation between the Dashboard and Recipe detail pages.
* **Service** - I will build a Node.js/Express backend  with the following endpoints:
    * **Auth**: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`.
    * **User**: `GET /api/users/`, `PUT /api/users/email`, `PUT /api/users/username`, `DELETE /api/users/`.
    * **Recipes**: `GET /api/recipes/dashboard`, `POST /api/recipes/`, `PUT /api/recipes/`, `DELETE /api/recipes/`.
    * **Ingredients**: `GET /api/recipes/ingredients`, `POST /api/recipes/ingredient`, `PUT /api/recipes/ingredient`.
    * **3rd Party API**: I will call an image generation API to generate representative food and or ingredient images for each recipe/ingredient created by the user.
* **DB/Login** - I will use a MySQL or MongoDB database to store user credentials (hashed with bcrypt), recipe metadata, and ingredient lists. I will implement JWT-based authentication to secure private routes.
* **WebSocket** - I will use WebSockets (Socket.io) to broadcast real-time updates. When a recipe is added or modified, a notification will be pushed to the UI, allowing for a collaborative or multi-device "live" experience.

---

## 🚀 HTML

* [x] **HTML pages** - I built the index.html file with a complete structure to serve as the application entry point.
* [x] **Proper HTML element usage** - I implemented semantic tags like header, nav, and section to follow modern accessibility standards.
* [x] **Links** - I added navigation anchors in the header and a footer link to the project's GitHub repository.
* [x] **Text** - I wrote original copy for the marketing sections and the step-by-step user instructions.
* [x] **3rd party API placeholder** - I connected the project to Google Fonts and Unsplash to demonstrate external asset integration, noting that the hero background image below the title could be swapped for a random image API in the future
* [x] **Images** - I incorporated a high-resolution background image for the hero section to improve UI appeal.
* [x] **Login placeholder** - I added dedicated buttons for signing in and account creation in the header and CTA sections.
* [x] **DB data placeholder** - I designed feature cards that act as visual containers for future database-driven recipe content.
* [x] **WebSocket placeholder** - I created a sharing section to represent where real-time social notifications will be handled.

## 🚀 CSS

* [x] **Header, footer, and main content body** - I applied a cohesive dark theme with a vibrant gradient header and a distinct, centered footer to frame the content.
* [x] **Navigation elements** - I styled the nav links using flexbox and added opacity transitions to provide clear visual feedback during user interaction.
* [x] **Responsive to window resizing** - I implemented media queries to collapse grid columns and adjust font sizes, ensuring the layout remains functional on mobile devices.
* [x] **Application elements** - I used CSS Grid to create modular, interactive feature cards and a structured "How It Works" section with consistent spacing.
* [x] **Application text content** - I integrated the Poppins font family with specific weights and sizes to establish a professional visual hierarchy.
* [x] **Application images** - I styled the hero background with an overlay and cover positioning to maintain text readability and a polished look.

## 🚀 React part 1: Routing

* [x] **Bundled using Vite** - I migrated the project to use Vite for bundling, which required restructuring the root directory and updating dependency configurations for a faster development environment.
* [x] **Components** - I converted all previous HTML pages into modular React components (e.g., `LandingPage`, `RecipeCard`, `NavigationBar`), separating layout, styles, and logic, and most pages require a valid user to be logged in for security reasons.
* [x] **Router** - I implemented `react-router-dom` to manage navigation between the Landing, Login, Dashboard, and Recipe pages without triggering full page reloads.

## 🚀 React part 2: Reactivity

* [x] **All functionality implemented or mocked out** - I fully mocked the backend using `localStorage` for data persistence (users, recipes, etc) and `setInterval` for real-time WebSocket notifications across 11 different pages.
* [x] **Hooks** - I utilized `useState` to manage local component state (like form inputs and recipe data) and `useEffect` to handle side effects such as checking authentication status on page load.

## 🚀 Service

- [x] **Node.js/Express HTTP service** - Created complete Express server in `service/index.js` running on port 4000 with proper middleware configuration and routing.
- [x] **Static middleware for frontend** - Implemented `app.use(express.static('public'))` to serve built React application from the `service/public/` directory in production.
- [x] **Calls to third-party endpoints** - Integrated `api.quotable.kurokeita.dev` to fetch random inspirational quotes displayed in a purple gradient box on the dashboard.
- [x] **Backend service endpoints** - Created RESTful endpoints for authentication (`/api/auth/*`), user profile (`/api/profile`), recipes (`/api/recipes`), and ingredients (`/api/ingredients`).
- [x] **Frontend calls service endpoints** - Updated 11 pages/components to replace localStorage with fetch calls using `credentials: 'include'` for cookie-based authentication.
- [x] **Supports registration, login, logout, and restricted endpoint** - Implemented full authentication flow with registration, login (sets HTTP-only cookie), logout (clears cookie), and middleware protecting all recipe/profile endpoints.
- [x] **Uses BCrypt to hash passwords** - All passwords hashed using BCrypt with salt rounds = 10 before storage; verification uses `bcrypt.compare()` to check credentials securely.


## 🚀 DB

- [x] **Stores data in MongoDB** - Migrated from in-memory storage to MongoDB Atlas. All recipes, ingredients, and user data now persist in MongoDB collections with proper indexing for performance.
- [x] **Stores credentials in MongoDB** - User credentials (email, hashed passwords, authentication tokens) are securely stored in MongoDB's `users` collection with bcrypt password hashing and unique email indexing.

## 🚀 WebSocket

- [x] **Backend listens for WebSocket connection** - Implemented `peerProxy.js` using the `ws` library to handle WebSocket upgrade requests and manage persistent connections with automatic ping/pong keepalive.
- [x] **Frontend makes WebSocket connection** - Created `useWebSocket.jsx` React hook that establishes WebSocket connections on component mount with automatic reconnection on disconnect.
- [x] **Data sent over WebSocket connection** - Backend broadcasts recipe events (create/update/delete) to all connected clients using `broadcastMessage()` function after database operations complete.
- [x] **WebSocket data displayed** - Real-time notifications appear as Snackbar alerts on the dashboard when other users create, update, or delete recipes, showing username and recipe name.
- [x] **Application is fully functional** - All features work end-to-end: authentication, CRUD operations, third-party quote API, MongoDB persistence, and real-time WebSocket notifications across multiple users.
