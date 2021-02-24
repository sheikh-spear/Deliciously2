const express = require('express')
const router = express.Router()
const tagService = require('./tag.service')

router.post('/create', create)
router.get('/all', getAll)
router.get('/', getAllIDs)
router.delete('/:id', _delete)
router.get('/:id', getById)

module.exports = router

function create (req, res, next) {
  tagService
    .create(req.body)
    .then(tag => res.json(tag))
    .catch(err => next(err))
}

function getAll (req, res, next) {
  tagService
    .getAll()
    .then(tag => res.json(tag))
    .catch(err => next(err))
}

function getById (req, res, next) {
  tagService
    .getById(req.params.id)
    .then(tag => (tag ? res.json(tag) : res.sendStatus(404)))
}

function getAllIDs (req, res, next) {
  tagService
    .getAllIDs()
    .then(tag => res.json(tag))
    .catch(err => next(err))
}

function _delete (req, res, next) {
  tagService
    .delete(req.params.id)
    .then(() =>
      res.json({
        status: 200,
        message: 'Restaurant deleted'
      })
    )
    .catch(err => next(err))
}
