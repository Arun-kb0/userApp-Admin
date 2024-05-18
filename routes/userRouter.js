const express = require("express")
const { createUser, updateUser } = require("../controller/userController")
const router = express.Router()


router.post('/create' , createUser)
router.post('/update', updateUser)

module.exports = router 