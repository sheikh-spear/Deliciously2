const config = require('config.json')

module.exports = errorHandler

function errorHandler (err, req, res, next) {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ message: err })
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res.status(400).json({ message: err.message })
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' })
  } else {
    if (config.debug) return res.status(500).json({ message: err.message }) // SECURITY CHECK: do not report raw exceptions to user
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
