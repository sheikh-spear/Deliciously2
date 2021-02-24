const express = require('express')
const router = express.Router()
const restaurantService = require('./restaurant.service')

router.post('/create', create)
router.get('/all', getAll)
router.get('/', getAllIDs)
router.delete('/:id', _delete)
router.get('/:id', getById)

module.exports = router;

function create (req, res, next) {
  restaurantService
    .create(req.body, req.user.sub)
    .then(restaurant => res.json(restaurant))
    .catch(err => next(err))
}

function getAll (req, res, next) {
  restaurantService
    .getAll()
    .then(restaurant => res.json(restaurant))
    .catch(err => next(err))
}

function getById (req, res, next) {
  restaurantService
    .getById(req.params.id)
    .then(restaurant =>
      restaurant ? res.json(restaurant) : res.sendStatus(404)
    )
}

function getAllIDs (req, res, next) {
  restaurantService
    .getAllIDs()
    .then(restaurant => res.json(restaurant))
    .catch(err => next(err))
}

function _delete (req, res, next) {
  restaurantService
    .delete(req.params.id, req.user.sub)
    .then(() =>
      res.json({
        status: 200,
        message: 'Restaurant deleted'
      })
    )
    .catch(err => next(err))
}
