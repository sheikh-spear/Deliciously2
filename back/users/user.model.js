const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  accountType: { type: String, default: 'consummer', required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.hash
    delete ret.lastLogin
  }
})

module.exports = mongoose.model('User', schema)
