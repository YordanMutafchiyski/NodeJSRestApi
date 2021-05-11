const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const LoginGuard = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://mm-restaurant-devcamp-2021-1.eu.auth0.com/.well-known/jwks.json`,
  }),

  audience: 'https://restaurant.devsmm.com/api',
  issuer: 'https://mm-restaurant-devcamp-2021-1.eu.auth0.com/',
  algorithms: ['RS256'],
});

module.exports = LoginGuard;
