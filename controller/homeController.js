const UsersModel = require("../model/UsersModel")
const bcrypt = require('bcrypt')

const homeController = async (req, res) => {
  if (!req.session.authorized) return res.redirect('/auth/login')
  try {
    const users = await UsersModel.find()
    res.render('index', { users })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "unable to load files" })
  }

}

const getOneUserController = async (req, res) => {
  const { userId } = req.query
  console.log(req.query)
  try {
    const foundUser = await UsersModel.findOne({ _id: userId })
    if(!foundUser) res.status(400).json({message:"user not found"})
    console.log("user found ")
    const password = 
    res.render('addUser' , {user :foundUser})
  } catch (error) {
    res.status(500).json({ message: "finding user failed" })
    console.log(error)
  }
}

module.exports = {
  homeController,
  getOneUserController
}