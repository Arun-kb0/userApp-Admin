const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require("mongoose")
require("dotenv").config()
const expressLayouts = require('express-ejs-layouts')
const homeRouter = require('./routes/homeRoutes')
const authRouter = require('./routes/authRoutes')
const cookeParser = require('cookie-parser')
const session = require('express-session')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const UsersModel = require('./model/UsersModel')
const userRouter = require('./routes/userRouter')
const { auth } = require('./middleware/authMiddleware')


const PORT = process.env.PORT || 3000
const app = express()
connectDB()

// * middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookeParser())
app.use(session({
  secret: "xyz",
  saveUninitialized: false,
  resave: true,
  cookie: {
    sameSite: 'strict',
    maxAge: 60 * 1000 * 60
  }
}))
app.use(expressLayouts)

// * static files 
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'public')))

// * view engine setup
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")


// * paths
app.use('/auth', authRouter)
app.use('/', auth, homeRouter)
app.use('/edit', auth, userRouter)


mongoose.connection.once('connected', () => {
  console.log('connected to mongodb')
  UsersModel.ensureIndexes()
  app.listen(PORT, () => console.log(`server is running at port ${PORT}`))
})
