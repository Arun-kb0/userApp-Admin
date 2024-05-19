const express = require('express')
const { homeController, getOneUserController, searchController } = require('../controller/homeController')
const router = express.Router()


router.get('/', homeController)
router.get('/getuser', getOneUserController)
router.get('/search',searchController)
module.exports  = router