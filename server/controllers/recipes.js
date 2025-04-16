/**
 * @module recipeController
 */

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


/**
 * Get list of recipes for the authenticated user
 * 
 * @async
 * @function getRecList
 * @param {import('express').Request} req - Express request (expects token in cookies)
 * @param {import('express').Response} res - Express response
 */
const getRecList = async (req, res) => {
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
}

/**
 * Get list of ingredients for the authenticated user
 * 
 * @async
 * @function getIng
 * @param {import('express').Request} req - Express request (expects token in cookies)
 * @param {import('express').Response} res - Express response
 */
const getIng = async (req, res) => {
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
}

/**
 * Get a specific recipe by ID, only if the user owns it
 * 
 * @async
 * @function getRec
 * @param {import('express').Request} req - Express request (expects token in cookies, recipe ID in URL param)
 * @param {import('express').Response} res - Express response
 */
const getRec = async (req, res) => {
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

}

/**
 * Add a new ingredient for the authenticated user
 * 
 * @async
 * @function postIng
 * @param {import('express').Request} req - Express request (expects name and measurement in body)
 * @param {import('express').Response} res - Express response
 */
const postIng = async (req, res) => {
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
    
}

/**
 * Add a new recipe and its ingredients for the authenticated user
 * 
 * @async
 * @function postRec
 * @param {import('express').Request} req - Express request (expects instructions, notes, title, and ingredients array in body)
 * @param {import('express').Response} res - Express response
 */
const postRec = async (req, res) => {
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
}

/**
 * Add ingredients to an existing recipe
 * 
 * @async
 * @function postUsedIn
 * @param {import('express').Request} req - Express request (expects recipeId and ingredients array in body)
 * @param {import('express').Response} res - Express response
 */
const postUsedIn = async (req, res) => {
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
}

/**
 * Update an existing recipe (title, instructions, notes)
 * 
 * @async
 * @function updRec
 * @param {import('express').Request} req - Express request (expects recipeId, title, notes, and instructions in body)
 * @param {import('express').Response} res - Express response
 */
const updRec = async (req, res) => {
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
}


/**
 * Update the used ingredients in a recipe
 * 
 * @async
 * @function updUsedIn
 * @param {import('express').Request} req - Express request (expects recipeId and updated ingredient mapping in body)
 * @param {import('express').Response} res - Express response
 */
const updUsedIn = async (req, res) => {
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
}


/**
 * Update a specific ingredient
 * 
 * @async
 * @function updIng
 * @param {import('express').Request} req - Express request (expects ingredientId, name, and measurement in body)
 * @param {import('express').Response} res - Express response
 */
const updIng = async (req, res) => {
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
}

/**
 * Delete a recipe if the user owns it
 * 
 * @async
 * @function delRec
 * @param {import('express').Request} req - Express request (expects recipeId in body)
 * @param {import('express').Response} res - Express response
 */
const delRec = async (req, res) => {
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
}

/**
 * Delete an ingredient from a recipe
 * 
 * @async
 * @function delUsedIn
 * @param {import('express').Request} req - Express request (expects recipeId and ingredientId in body)
 * @param {import('express').Response} res - Express response
 */
const delUsedIn = async (req, res) => {
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
}

/**
 * Delete an ingredient from the user's list
 * 
 * @async
 * @function delIng
 * @param {import('express').Request} req - Express request (expects ingredientId in body)
 * @param {import('express').Response} res - Express response
 */
const delIng = async (req, res) => {
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
}

module.exports = {delIng, delUsedIn, delRec, updIng, updRec, updUsedIn, postRec, postUsedIn, postIng, getIng, getRec, getRecList }