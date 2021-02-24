const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  owner: { type: String, required: true },
  images: {type: [String]},
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  address: { type: String, required: true },
  priceRangeLow: { type: Number, required: true },
  priceRangeHigh: { type: Number, required: true },
  tags: { type: [String], required: false }
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.owner;
    delete ret._id;
  }
})

module.exports = mongoose.model('Restaurant', schema)
