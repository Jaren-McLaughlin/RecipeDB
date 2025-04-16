const express = require(`express`)
const router = express.Router()

const users = require(`../controllers/users`)


router.get(`/`, users.getUserInfo)

router.put(`/email`, users.updEmail)

router.put(`/username`, users.updUserName)

router.put(`/password`, users.updPass)

router.delete(`/`, users.delUser)

module.exports = router