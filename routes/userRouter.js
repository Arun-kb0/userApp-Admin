const express = require("express")
const { createUserController, updateUserController, deleteUserController } = require("../controller/userController")
const router = express.Router()


router.post('/create' , createUserController)
router.post('/update', updateUserController)
router.delete('/delete', deleteUserController)


module.exports = router 