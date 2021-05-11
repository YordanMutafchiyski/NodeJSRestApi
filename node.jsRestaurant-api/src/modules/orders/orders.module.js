const awilix = require('awilix');
const routeBuilder = require('../../utils/route-builder');
const { OrdersService } = require('./services');
const { OrdersController } = require('./controllers');

module.exports = (container) => {
  container.register({
    OrdersService: awilix.asFunction(OrdersService),
  });

  return {
    router: () =>
      routeBuilder(OrdersController, {
        OrdersService: container.resolve('OrdersService')
      }),
  };
};