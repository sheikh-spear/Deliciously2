const config = require('config.json')
const db = require('_helpers/db')
const Restaurant = db.Restaurant
const tagService = require('../tags/tag.service')

module.exports = {
  getAll,
  getAllIDs,
  getById,
  create,
  _delete
}

async function getAll () {
  return await Restaurant.find()
}

async function getAllIDs () {
  return await Restaurant.find({}, ['name'])
}

async function getById (id) {
  return await Restaurant.findById(id)
}

async function create (restaurantParam, owner) {
  const restaurant = new Restaurant(restaurantParam)
  // for (let index = 0; index < restaurant.tags.length; index++) {
  //   if (await tagService.getById(restaurant.tags[index])) {
  //     throw 'Unknown tag:' + restaurant.tags[index]
  //   }
  // }
  restaurant.owner = owner
  await restaurant.save()
  return restaurant
}

async function _delete (id, owner) {
  var restaurant = await Restaurant.findById(id)
  if (restaurant.owner === owner) {
    await Restaurant.findByIdAndRemove(id)
  } else throw "This restaurant does't belong to you"
}
