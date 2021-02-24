const db = require('_helpers/db')
const Tag = db.Tag

module.exports = {
  getAll,
  getAllIDs,
  getById,
  create,
  _delete
}

async function getAll () {
  return await Tag.find()
}

async function getAllIDs () {
  return await Tag.find()
}

async function getById (id) {
  return await Tag.findById(id)
}

async function create (tagParam) {
  const tag = new Tag(tagParam)
  await tag.save()
  return tag
}

async function _delete (id) {
  return await Tag.findByIdAndRemove(id)
}
