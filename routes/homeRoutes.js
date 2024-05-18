const express = require('express')
const { homeController, getOneUserController } = require('../controller/homeController')
const router = express.Router()


router.get('/', homeController)
router.get('/getuser', getOneUserController)

module.exports  = router