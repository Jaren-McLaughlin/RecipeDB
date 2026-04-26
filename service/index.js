const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const db = require('./database');
const { peerProxy, broadcastMessage } = require('./peerProxy');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  });
}

const apiRouter = express.Router();
app.use('/api', apiRouter);

// ─── Public Auth Endpoints ────────────────────────────────────────────────────

apiRouter.post('/auth/create', async (req, res) => {
  const { email, password, userName } = req.body;

  if (!email || !password || !userName) {
    return res.status(400).send({ msg: 'Missing required information' });
  }

  try {
    if (await db.findUser(email)) {
      return res.status(409).send({ msg: 'Existing user' });
    }

    const user = await db.createUser(email, password, userName);
    setAuthCookie(res, user.token);
    res.send({ id: user.id, email: user.email, userName: user.userName });
  } catch (error) {
    res.status(500).send({ msg: 'Error creating user' });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.findUser(email);

    if (user && await bcrypt.compare(password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user.id, email: user.email, userName: user.userName });
      return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
  } catch (error) {
    res.status(500).send({ msg: 'Login error' });
  }
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie('token');
  res.status(204).end();
});

apiRouter.get('/user/:email', async (req, res) => {
  try {
    const user = await db.findUser(req.params.email);
    if (user) {
      const token = req.cookies['token'];
      res.send({
        email: user.email,
        userName: user.userName,
        authenticated: token === user.token
      });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching user' });
  }
});

// ─── Public Recipe Endpoint ───────────────────────────────────────────────────
// Registered on apiRouter BEFORE secureApiRouter so the auth middleware
// never intercepts this route. Anyone with the share link can read it.

apiRouter.get('/recipes/public/:id', async (req, res) => {
  try {
    const database = db.getDB();
    const recipe = await database.collection('recipes').findOne({
      recipeId: parseInt(req.params.id)
    });

    if (!recipe) {
      return res.status(404).send({ msg: 'Recipe not found' });
    }

    res.send({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      notes: recipe.notes,
      author: recipe.author
    });
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching recipe' });
  }
});

// ─── Secure API Router ────────────────────────────────────────────────────────
// Everything mounted below this point requires a valid auth cookie.

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies['token'];
  try {
    const user = await db.findUserByToken(authToken);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Authentication error' });
  }
});

// Profile Endpoints
secureApiRouter.get('/profile', async (req, res) => {
  try {
    const user = req.user;
    const userRecipes = await db.findRecipesByAuthor(user.email);
    res.send({
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
      recipeCount: userRecipes.length
    });
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching profile' });
  }
});

secureApiRouter.put('/profile', async (req, res) => {
  const { userName, email } = req.body;
  const user = req.user;

  try {
    if (email && email !== user.email) {
      const existingUser = await db.findUser(email);
      if (existingUser) {
        return res.status(409).send({ msg: 'Email already in use' });
      }
    }

    const updates = {};
    if (userName) updates.userName = userName;
    if (email) updates.email = email;

    await db.updateUser(user.email, updates);
    res.send({ userName: userName || user.userName, email: email || user.email });
  } catch (error) {
    res.status(500).send({ msg: 'Error updating profile' });
  }
});

secureApiRouter.put('/profile/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = req.user;

  try {
    if (!await bcrypt.compare(currentPassword, user.password)) {
      return res.status(401).send({ msg: 'Incorrect current password' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.updateUser(user.email, { password: passwordHash });
    res.send({ msg: 'Password updated successfully' });
  } catch (error) {
    res.status(500).send({ msg: 'Error updating password' });
  }
});

// Recipe Endpoints
secureApiRouter.get('/recipes', async (req, res) => {
  try {
    const userRecipes = await db.findRecipesByAuthor(req.user.email);
    res.send(userRecipes);
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching recipes' });
  }
});

secureApiRouter.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await db.findRecipeById(req.params.id, req.user.email);
    if (recipe) {
      res.send(recipe);
    } else {
      res.status(404).send({ msg: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching recipe' });
  }
});

secureApiRouter.post('/recipes', async (req, res) => {
  const { title, instructions, notes, ingredients } = req.body;

  try {
    const recipeIngredients = [];
    const allIngredients = await db.getAllIngredients();

    for (const ing of ingredients) {
      let ingId = ing.ingredientId;

      if (!ingId) {
        const existing = allIngredients.find(
          si => si.name.toLowerCase() === ing.name.toLowerCase()
        );
        if (existing) {
          ingId = existing.ingredientId;
        } else {
          const newIng = await db.createIngredient({ name: ing.name, measurement: ing.unit });
          ingId = newIng.ingredientId;
        }
      }

      recipeIngredients.push({
        ingredientId: ingId,
        name: ing.name,
        quantity: ing.quantity,
        measurement: ing.unit
      });
    }

    const recipe = await db.createRecipe({
      title,
      instructions,
      notes,
      ingredients: recipeIngredients,
      author: req.user.email
    });

    broadcastMessage({
      type: 'recipeCreated',
      userName: req.user.userName,
      recipeName: title,
      timestamp: new Date().toISOString()
    });

    res.send(recipe);
  } catch (error) {
    res.status(500).send({ msg: 'Error creating recipe' });
  }
});

secureApiRouter.put('/recipes/:id', async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const { title, instructions, notes, ingredients: newIngredients } = req.body;

  try {
    const recipe = await db.findRecipeById(recipeId, req.user.email);

    if (!recipe) {
      return res.status(404).send({ msg: 'Recipe not found' });
    }

    const recipeIngredients = [];
    const allIngredients = await db.getAllIngredients();

    for (const ing of newIngredients) {
      let ingId = ing.ingredientId || ing.id;

      if (!ingId) {
        const existing = allIngredients.find(
          si => si.name.toLowerCase() === ing.name.toLowerCase()
        );
        if (existing) {
          ingId = existing.ingredientId;
        } else {
          const newIng = await db.createIngredient({ name: ing.name, measurement: ing.unit });
          ingId = newIng.ingredientId;
        }
      }

      recipeIngredients.push({
        ingredientId: ingId,
        name: ing.name,
        quantity: ing.quantity,
        measurement: ing.unit
      });
    }

    await db.updateRecipe(recipeId, req.user.email, {
      title,
      instructions,
      notes,
      ingredients: recipeIngredients
    });

    broadcastMessage({
      type: 'recipeUpdated',
      userName: req.user.userName,
      recipeName: title,
      timestamp: new Date().toISOString()
    });

    const updatedRecipe = await db.findRecipeById(recipeId, req.user.email);
    res.send(updatedRecipe);
  } catch (error) {
    res.status(500).send({ msg: 'Error updating recipe' });
  }
});

secureApiRouter.delete('/recipes/:id', async (req, res) => {
  const recipeId = parseInt(req.params.id);

  try {
    const recipe = await db.findRecipeById(recipeId, req.user.email);

    if (!recipe) {
      return res.status(404).send({ msg: 'Recipe not found' });
    }

    const deleted = await db.deleteRecipe(recipeId, req.user.email);

    if (deleted) {
      broadcastMessage({
        type: 'recipeDeleted',
        userName: req.user.userName,
        recipeName: recipe.title,
        timestamp: new Date().toISOString()
      });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).send({ msg: 'Error deleting recipe' });
  }
});

secureApiRouter.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await db.getAllIngredients();
    res.send(ingredients);
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching ingredients' });
  }
});

// ─── Error Handling & Fallback ────────────────────────────────────────────────

app.use((err, req, res, next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

db.connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });

    peerProxy(server);
    console.log('WebSocket server initialized');
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });