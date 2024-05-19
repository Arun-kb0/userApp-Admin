const UsersModel = require("../model/UsersModel")
const { Types } = require("mongoose")


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
    const foundUser = await UsersModel.findOne({ _id: new Types.ObjectId(userId) })
    if (!foundUser) return res.status(400).json({ message: "user not found" })
    console.log("user found ")
    console.log(foundUser)
    res.render('addUser', { user: foundUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "finding user failed" })
  }
}

const searchController = async (req, res) => {
  const { searchString } = req.query
  console.log(searchString)
  try {
    if (!searchString || searchString === '') {
      return res.status(400).json({message:"search string empty"})
    }
    const users = await UsersModel.find(
      { $text: { $search: searchString } },
      { score: { $meta: "textScore" }}
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(20)
    res.render('index',{users})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "search user failed" })
  }
}

module.exports = {
  homeController,
  getOneUserController,
  searchController
}