const express = require(`express`)
const router = express.Router()

const getRecipeDetails = require(`../models/getRecipeDetails`)
const getRecipeList = require(`../models/getRecipeList`)
const addRecipe = require(`../models/addRecipe`)
const addIngredients = require(`../models/addIngredient`)
const addUsedIn = require(`../models/addUsedIn`)
const verifyToken = require("../middleware/verifyToken")



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

// sends the list of recipes for the dashboard
router.get(`/dashboard`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const recipes = await getRecipeList({userId: userId})
        if(!recipes) return res.status(404).send(`User does not have recipes`)

        res.status(200).send(recipes)
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

// creates a recipe
router.post(`/`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { instructions, notes, title} = req.body

        if(!instructions || !title || !userId) return res.status(400).send(`missing required information`)

        const recId = await addRecipe({instructions : instructions, notes: notes, title: title, userId: userId})

        if(!recId) return res.status(404).send(`User could not add recipe`)
        
        res.status(201).send(recId)
        
    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

module.exports = router