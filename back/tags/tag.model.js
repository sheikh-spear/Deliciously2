const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  imageLink: { type: String, required: true },
  text: { type: String, required: true },
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {}
})

module.exports = mongoose.model('Tag', schema)
