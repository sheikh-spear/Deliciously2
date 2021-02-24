const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/img/logo.png'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    console.log(payload.iat)
    console.log(Math.floor(user.lastLogin.getTime() / 1000, 2))
    if (payload.iat < Math.floor(user.lastLogin.getTime() / 1000, 2) || !user) { //SECURITY CHECK: last time user has logged in
        return done(null, true);
    }

    done();
};