const express = require(`express`)
const router = express.Router()

const recipes = require(`../controllers/recipes`)



router.get(`/dashboard`, recipes.getRecList)

router.get(`/ingredients`, recipes.getIng)

router.get(`/:id`, recipes.getRec)

router.post(`/ingredient`, recipes.postIng)

router.post(`/`, recipes.postRec)

router.post(`/usedIn`, recipes.postUsedIn)

router.put(`/`, recipes.updRec)

router.put(`/usedIn`, recipes.updUsedIn)

router.put(`/ingredient`, recipes.updIng)

router.delete(`/`, recipes.delRec)

router.delete(`/usedIn`, recipes.delUsedIn)

router.delete(`/ingredient`, recipes.delIng)

module.exports = router

