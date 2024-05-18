const fsPromises = require("fs").promises
const path = require('path')

const homeController =async (req, res) => {
  if (!req.session.authorized) return res.redirect('/auth/login')
  try {
    const imageDir = path.join(__dirname,'..' ,'public', 'images')
    const images = await fsPromises.readdir(imageDir)
    console.log(images)
    res.render('index', { images })
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"unable to load files"})
  }
 
}

module.exports = { homeController }