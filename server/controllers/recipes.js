const express = require(`express`)
const router = express.Router()

const getRecipeDetails = require(`../models/getRecipeDetails`)
const getRecipeList = require(`../models/getRecipeList`)
const addRecipe = require(`../models/addRecipe`)
const addIngredient = require(`../models/addIngredient`)
const addUsedIn = require(`../models/addUsedIn`)
const verifyToken = require("../middleware/verifyToken")
const getIngredients = require(`../models/getIngredients`)
const updateRecipe = require("../models/updateRecipe")
const updateUsedIn = require(`../models/updateUsedIn`)
const updateIngredient = require("../models/updateIngredient")
const deleteUsedIn = require("../models/deleteUsedIn")
const deleteIngredient = require("../models/deleteIngredient")
const deleteRecipe = require("../models/deleteRecipe")


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
            const passed = await addUsedIn({recipeId: recipeId, ingredientId: ingredient.ingredientId, quantity: ingredient.quantity})
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

router.post(`/usedIn`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { recipeId, ingredients} = req.body

        const { recipeDetails: recipe, userId: recUserId } = await getRecipeDetails({recipeId})

        if(userId !== recUserId) return res.status(403).send(`not authorized to access recipe`)

        if(!recipeId || !ingredients) return res.status(400).send(`missing required information`)

        for (const ingredient of ingredients) {
            const passed = await addUsedIn({recipeId: recipeId, ingredientId: ingredient.ingredientId, quantity: ingredient.quantity})
            if(!passed) return res.status(404).send(`User could not add to recipe`)
        }

        res.status(201).send(`successful add!`)
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

//update an existing recipe
router.put(`/`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { instructions, notes, title, recipeId} = req.body

        if(!instructions || !title || !notes || !recipeId) return res.status(400).send(`missing required information`)

        const { recipeDetails: recipe, userId: recUserId } = await getRecipeDetails({recipeId})

        if(userId !== recUserId) return res.status(403).send(`not authorized to access recipe`)

        const success = await updateRecipe({instructions : instructions, notes: notes, title: title, recipeId: recipeId})

        if(!success) return res.status(404).send(`User could not update recipe`)

        res.status(200).send(`Successful Update!`)
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})


//update the usedIn Table
router.put(`/usedIn`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { ingredients , recipeId } = req.body

        if(!ingredients || !recipeId) return res.status(400).send(`missing required information`)

        const { recipeDetails: recipe, userId: recUserId } = await getRecipeDetails({recipeId})

        if(userId !== recUserId) return res.status(403).send(`not authorized to access recipe`)

            for (const ingredient of ingredients) {
                const passed = await updateUsedIn({currentIngredientId: ingredient.currentIngredientId, newIngredientId: ingredient.newIngredientId, quantity: ingredient.quantity, recipeId: recipeId})
                if(!passed) return res.status(404).send(`User could not update ingredient in recipe`)
            }


        res.status(200).send(`Successful Update!`)
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})


//update a specific ingredient
router.put(`/ingredient`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { ingredientId , measurement , name } = req.body

        if(!ingredientId || !measurement || !name) return res.status(400).send(`missing required information`)

        const success = await updateIngredient({ingredientId: ingredientId, measurement: measurement, name: name})

        if(!success) return res.status(404).send(`User could not update ingredient`)

        res.status(200).send(`Successful Update!`)
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

// delete a whole recipe
router.delete(`/`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { recipeId } = req.body

        if(!recipeId) return res.status(400).send(`missing required information`)

        const { recipeDetails: recipe, userId: recUserId } = await getRecipeDetails({recipeId})

        if(userId !== recUserId) return res.status(403).send(`not authorized to access recipe`)

        const success = deleteRecipe({recipeId})

        if(!success) return res.status(404).send(`User could not delete Recipe`)

        res.status(200).send(`Successful Deletion!`)
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

// delete an ingredient from a recipe
router.delete(`/usedIn`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { ingredientId , recipeId } = req.body

        if(!ingredientId || !recipeId) return res.status(400).send(`missing required information`)

        const { recipeDetails: recipe, userId: recUserId } = await getRecipeDetails({recipeId})

        if(userId !== recUserId) return res.status(403).send(`not authorized to access recipe`)

        const success = deleteUsedIn({ingredientId: ingredientId, recipeId: recipeId})

        if(!success) return res.status(404).send(`User could not delete ingredient from Recipe`)

        res.status(200).send(`Successful Deletion!`)
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

router.delete(`/ingredient`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { ingredientId } = req.body

        if(!ingredientId) return res.status(400).send(`missing required information`)

        const success = deleteIngredient({ingredientId})

        if(!success) return res.status(404).send(`User could not delete ingredient`)

        res.status(200).send(`Successful Deletion!`)
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

module.exports = router