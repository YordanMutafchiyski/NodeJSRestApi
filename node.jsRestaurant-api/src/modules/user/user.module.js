const awilix = require('awilix');
const routeBuilder = require('../../utils/route-builder');
const { UserService } = require('./services');
const { UserController } = require('./controllers');

module.exports = (container) => {
  container.register({
    UserService: awilix.asFunction(UserService),
  });

  return {
    router: () =>
      routeBuilder(UserController, {
        Auth0Service: container.resolve('Auth0Service'),
        UserService: container.resolve('UserService'),
      }),
  };
};
