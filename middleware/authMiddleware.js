
const auth = (req, res, next) => {
  try {
    if (req.session.authorized === true) {
      return next()
    }
    res.redirect('/auth/login')
  } catch (error) {
    console.log(error)
    res.redirect('/auth/login')
  }
  
}

module.exports = {
  auth
}