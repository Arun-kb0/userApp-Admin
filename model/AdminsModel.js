const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminsSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {type:String , required:true , unique:true},
  password: { type: String, required: true },
  createdAt: {type: Date , default:new Date()}
})

adminsSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('admins',adminsSchema)
