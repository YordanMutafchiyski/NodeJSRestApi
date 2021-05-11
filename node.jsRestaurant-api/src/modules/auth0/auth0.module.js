const awilix = require('awilix');
const { Auth0Service } = require('./services');

module.exports = (container) => {
  container.register({
    Auth0Service: awilix.asFunction(Auth0Service),
  });
};
