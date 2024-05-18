const express = require('express')
const { loginController, getSignUpPageController, getLoginPageController, logoutController, signUpController } = require('../controller/authController')
const router = express.Router()


router.route('/login')
  .get(getLoginPageController)
  .post(loginController)

router.get('/logout', logoutController)

// router.route('/signup')
//   .get(getSignUpPageController)
//   .post(signUpController)


module.exports = router