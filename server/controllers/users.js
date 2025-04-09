const express = require(`express`)
const router = express.Router()
const bcrypt = require('bcrypt')


const getUserDetails = require(`../models/getUserDetails`)
const updateEmail = require(`../models/updateEmail`)
const verifyToken = require("../middleware/verifyToken")
const updateUserName = require("../models/updateUserName")
const updatePassword = require("../models/updatePassword")
const deleteUser = require('../models/deleteUser')

const saltRounds = 10;

router.get(`/`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

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

// updates an email
router.put(`/email`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { email } = req.body

        if(!email) return res.status(400).send(`missing required information`)

        const success = await updateEmail({userId: userId, email: email})
        if(!success) return res.status(404).send(`user not found`)

        res.status(200).send(`Successful Update!`)

    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

// updates a username
router.put(`/username`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { userName } = req.body

        if(!userName) return res.status(400).send(`missing required information`)

        const success = await updateUserName({userId: userId, userName: userName})
        if(!success) return res.status(404).send(`user not found`)

        res.status(200).send(`Successful Update!`)

    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

// updates a password
router.put(`/password`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const { password } = req.body

        if(!password) return res.status(400).send(`missing required information`)

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const success = await updatePassword({userId: userId, password: hashedPassword})
        if(!success) return res.status(404).send(`user not found`)

        res.status(200).send(`Successful Update!`)

    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})

// delete a user
router.delete(`/`, async (req, res) => {
    try{
        const payload = await verifyToken({token: req.cookies.token})
        if(!payload) return res.status(401).send(`not an authorized user`)

        const userId = payload.jwtData.userId;

        const success = await deleteUser(userId)
        if(!success) return res.status(404).send(`Could not delete user`)

        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Lax'
        })
        return res.status(200).send(`Successful Deletion!`)

    } catch (error){
        console.error(error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        res.status(500).send(`Something went wrong`)
    }
})


module.exports = router