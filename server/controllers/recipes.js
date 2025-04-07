const express = require(`express`)
const router = express.Router()

const getRecipeDetails = require(`../models/getRecipeDetails`)
const getRecipeList = require(`../models/getRecipeList`)
const addRecipe = require(`../models/addRecipe`)
const addIngredient = require(`../models/addIngredient`)
const addUsedIn = require(`../models/addUsedIn`)
const verifyToken = require("../middleware/verifyToken")
const getIngredients = require(`../models/getIngredients`)


// sends the list of recipes for the dashboard
router.get(`/dashboard`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const {recipeList} = await getRecipeList({userId})
        if(!recipeList) return res.status(404).send(`User does not have recipes`)

        res.status(200).send(recipeList)
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

// gets your list of ingredients with their information
router.get(`/ingredients`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { ingredientList } = await getIngredients({userId})

        res.status(200).send(ingredientList)
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

// :id is recipe id
router.get(`/:id`, async (req, res) => {
    try{

        const payload = await verifyToken({ token: req.cookies.token })
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userIdreq = payload.jwtData.userId;

        const { recipeDetails: recipe, userId: userId } = await getRecipeDetails({recipeId: req.params.id})

        if(!recipe) return res.status(404).send(`Recipe with ID ${req.params.id} does not exist`)

        if(userIdreq != userId) return res.status(403).send(`not authorized to access recipe with ID ${req.params.id}`)

        res.status(200).send(recipe)

    } catch (error) {
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }

})

// adds new ingredient to ingredient table
router.post(`/ingredient`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)
    
        const userId = payload.jwtData.userId
    
        const { name, measurement } = req.body
    
        if(!name || !measurement) return res.status(400).send(`missing required information`)
    
        const ingredientId = await addIngredient({name: name, measurement: measurement, userId: userId})
    
        if(!ingredientId) return res.status(404).send(`User could not add recipe`)
    
        res.status(201).send(ingredientId)
    } catch (error){
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
    

    
})

// creates a recipe, ties your existing ingredients to the recipe you want to make
router.post(`/`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { instructions, notes, title, ingredients} = req.body

        if(!instructions || !title || !userId || !ingredients) return res.status(400).send(`missing required information`)

        const {recipeId} = await addRecipe({instructions : instructions, notes: notes, title: title, userId: userId})

        if(!recipeId) return res.status(404).send(`User could not add recipe`)

        for (const ingredient of ingredients) {
            passed = await addUsedIn({recipeId: recipeId, ingredientId: ingredient.ingredientId, quantity: ingredient.quantity})
            if(!passed) return res.status(404).send(`User could not add recipe`)
        }

        res.status(201).send({recipeId})
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

module.exports = router