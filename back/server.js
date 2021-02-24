require('rootpath')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('_helpers/jwt')
const errorHandler = require('_helpers/error-handler')
const restaurantService = require('./restaurants/restaurants.controller')
const runSeeds = require('./seeds')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// use JWT auth to secure the api
app.use(jwt())

// api routes
app.use('/users', require('./users/users.controller'))
app.use('/restaurants', require('./restaurants/restaurants.controller'))
app.use('/tags', require('./tags/tags.controller'))

// global error handler
app.use(errorHandler)
app.use(express.static(__dirname + '/public'))
// start server
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000

runSeeds.runSeeds();

const server = app.listen(port, function () {
  console.log('Server listening on port ' + port)
})
