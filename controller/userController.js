const bcrypt = require('bcrypt')
const UsersModel = require('../model/UsersModel')
const {  Types } = require('mongoose')

// * create user
const createUser = async (req, res) => {
  const { email, password, firstname, lastname } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
      firstname,
      lastname,
      email,
      password: hashedPassword
    }
    const duplicates = await UsersModel.findOne({ email: email })
    if (duplicates) return res.status(409).json({ message: "email already exists" })
    const result = await UsersModel.create(user)
    console.log(`${result.email} created success`)
    res.status(200).json({ message: `user created` })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error creating user" })
  }
}

// * update user 
const updateUser = async (req, res) => {
  const { email, password, firstname, lastname, _id } = req.body
  console.log(req.body)
  try {
    if (_id === '' && email === '') {
      res.status(400).json({ message: "email or _id required" })
    }

    const createUserObj = async () => {
      return {
        email: email !== '' ? email : foundUser.email,
        firstname: firstname !== '' ? firstname : foundUser.firstname,
        lastname: lastname !== '' ? lastname : foundUser.lastname,
        password: password !== '' ? await bcrypt.hash(password, 10) : foundUser.password
      }
    }

    let foundUser
    let result
    if (_id !== '' && Types.ObjectId.isValid(_id)) {
      foundUser = await UsersModel.find({ _id: _id })
      const user = await createUserObj()
      console.log(user)
      result = await UsersModel.updateOne(
        { _id: _id },
        user
      )
    } else if(email!== '') {
      foundUser = await UsersModel.find({ email: email })
      const user = await createUserObj()
      console.log(user)
      result = await UsersModel.updateOne(
        { email: email },
        user
      )
    }
    console.log("result")
    console.log(result)
    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: `user updated` })
    }
    return res.status(400).json({ message: "email or _id required " })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "cannot update user" })
  }
}


module.exports = {
  createUser,
  updateUser
}


