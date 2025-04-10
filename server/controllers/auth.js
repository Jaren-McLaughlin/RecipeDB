const express = require(`express`)
const router = express.Router()
const bcrypt = require('bcrypt')


const addUser = require(`../models/addUser`)
const getLoginDetails = require(`../models/getLoginDetails`)

const createToken = require(`../middleware/createToken`)

const saltRounds = 10;


// creating a user
router.post(`/register`, async (req, res) => {
    try{

        const { userName, email, password } = req.body

        if(!userName || !email || !password) return res.status(400).send(`missing required information`)

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const userId = await addUser({ userName: userName, email: email, password: hashedPassword })

        if(!userId) return res.status(404).send(`could not create user with provided data`)
        
        const {token} = await createToken({userId})

        res.status(200)
        .cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
            maxAge: 60 * 60 * 1000 // 1 hour
        })
        .send(`User registered successfully`)

    } catch (error) {
        console.error(error)
        res.status(500).send(`Something went wrong`)
    }

})

// logging in a user
router.post(`/login`, async (req, res) => {
    try{

        const { email, password } = req.body

        if(!email || !password) return res.status(400).send(`missing required information`)

        const { loginDetails } = await getLoginDetails({ email })

        if(!loginDetails || !loginDetails.password) return res.status(401).send(`Invalid credentials`)

        const passwordMatch = await bcrypt.compare(password, loginDetails.password)

        if(!passwordMatch) return res.status(401).send('Invalid credentials')

        const {token} = await createToken({userId: loginDetails.userId})

        res.status(200)
        .cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
            maxAge: 60 * 60 * 1000 // 1 hour
        })
        .send(`Logged in successfully`)
        
    } catch (error){
        console.error(error)
        res.status(500).send(`Something went wrong`)
    }
})

// logout the user
router.post(`/logout`, async (req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Strict'
        })
        .status(200)
        .send(`Logged out successfully`)
        
    } catch (error){
        console.error(error)
        res.status(500).send(`Something went wrong`)
    }
})

module.exports = router