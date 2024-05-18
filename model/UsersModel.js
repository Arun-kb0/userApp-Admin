const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usersSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true  },
  password: { type: String, required: true , unique:true },
  createdAt: { type: Date, default: new Date() }
})

usersSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('users', usersSchema)