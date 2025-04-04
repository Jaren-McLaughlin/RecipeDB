const express = require(`express`)
const router = express.Router()


const getUserDetails = require(`../models/getUserDetails`)
const verifyToken = require("../middleware/verifyToken")


router.get(`/`, async (req, res) => {
    try{
        const payload = await verifyToken(req.cookies.token)
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.userId;

        const { userDetails } = await getUserDetails({userId: userId})
        if(!userDetails) return res.status(404).send(`user not found`)

        res.status(200).send(userDetails)

    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

module.exports = router