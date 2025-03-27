const express = require(`express`)
const router = express.Router()

const recipeDetails = require(`../models/getRecipeDetails`)
const recipeList = require(`../models/getRecipeList`)
const addRecipe = require(`../models/addRecipe`)

// :id is recipe id
router.get(`/:id`, async (req, res) => {
    try{
    const { recipeDetails: recipe } = await recipeDetails.getRecipeDetails({recipeId: req.params.id})
    if(!recipe) res.status(404).send(`Recipe with ID ${req.params.id} does not exist`)
    else res.status(200).send(recipe)
    } catch (error) {
        console.error(error)
        res.status(500).send(`Something went wrong`)
    }

})

// :id is user id
router.get(`/dashboard/:id`, async (req, res) => {
    try{
        const recipes = await recipeList.getRecipeList({userId: req.params.id})
        if(!recipes) res.status(404).send(`UserID ${req.params.id} does not have recipes`)
        else res.status(200).send(recipes)
    } catch (error){
        console.error(error)
        res.status(500).send(`Something went wrong`)
    }
})

// :id is user id
router.post(`/:id`, async (req, res) => {
    try{
        userId = req.params.id
        const { instructions, notes, title} = req.body
        if(!instructions || !title || !userId) return res.status(400).send(`missing required information`)
        const recId = await addRecipe.addRecipe({instructions : instructions, notes: notes, title: title, userId: userId})
        if(!recId) res.status(404).send(`UserID ${req.params.id} could not add recipe`)
        else res.status(201).send(recId)
        
    } catch (error){
        console.error(error)
        res.status(500).send(`Something went wrong`)
    }
})

module.exports = router