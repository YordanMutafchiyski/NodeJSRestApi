const awilix = require('awilix');
const routeBuilder = require('../../utils/route-builder');
const { OrdersDetailsService } = require('./services');
const { OrdersDetailsController } = require('./controllers');

module.exports = (container) => {
  container.register({
    OrdersDetailsService: awilix.asFunction(OrdersDetailsService),
  });

  return {
    router: () =>
      routeBuilder(OrdersDetailsController, {
        OrdersDetailsService: container.resolve('OrdersDetailsService')
      }),
  };
};