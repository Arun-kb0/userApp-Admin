const whiteList = require("./whitelist")


const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not allowed by cors'))
    }
  }
}

module.exports = corsOptions