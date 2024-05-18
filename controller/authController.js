const bcrypt = require('bcrypt')
const UsersModel = require('../model/UsersModel')
const AdminsModel = require('../model/AdminsModel')

// * LOGIN

const getLoginPageController = (req, res) => {
  console.log(`login page ${req.session?.authorized}`)

  if (req.session?.authorized) return res.redirect('/')
  res.render('login')
}

// * login
const loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) return res.status(400).json({ "message": "email and password required" })
    const foundUser = await AdminsModel.findOne({email}) 
    if (!foundUser) return res.status(404).json({ message: "invalid username" })
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) return res.status(401).json({ message: "invalid password" })
    req.session.user = {
      name: foundUser.firstname + " " + foundUser.lastname,
      email: foundUser.email
    }
    req.session.authorized = true
    console.log(`${req.session.user.email} login success`)
    res.status(200).json({ message: `login success !`, user: req.session.user })
  } catch (err) {
    res.sendStatus(500)
  }
}

// * logout
const logoutController = async (req, res) => {
  console.log(req.session.user)
  try {
    await req.session.destroy()
    console.log("logout success")
    res.clearCookie('connect.sid')
    res.sendStatus(200)
  } catch (err) {
    console.log("logout failed")
    console.log(err)
    res.sendStatus(500)
  }
}


// * SIGN UP

// const getSignUpPageController = async (req, res) => {
//   console.log(`signup page ${req.session?.authorized}`)
//   if (req.session?.authorized) return res.redirect('/')
//   res.render('signup')
// }

// const signUpController = async (req, res) => {
//   const { firstName, lastName, email, password  } = req.body
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const user = {
//       firstname: firstName,
//       lastname: lastName,
//       email,
//       password: hashedPassword
//     }
//     const duplicates = await UsersModel.findOne({ email: email })
//     if (duplicates) return res.status(409).json({message:"email already exists"})
//     const result = await UsersModel.create(user)
//       req.session.user = {
//         name: result.firstname + " " + result.lastname,
//         email: result.email
//       }
//     req.session.authorized = true
//     console.log(`${req.session.user.email} login success`)
//     res.status(200).json({ message: `signup success !`, user: req.session.user })

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message:"error creating user"})
//   }
  
// }



module.exports = {
  getLoginPageController,
  loginController,
  logoutController,
}

