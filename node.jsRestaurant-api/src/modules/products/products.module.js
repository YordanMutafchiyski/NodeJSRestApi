const awilix = require('awilix');
const routeBuilder = require('../../utils/route-builder');
const { ProductsService } = require('./services');
const { ProductsController } = require('./controllers');

module.exports = (container) => {
  container.register({
    ProductsService: awilix.asFunction(ProductsService),
  });

  return {
    router: () =>
      routeBuilder(ProductsController, {
        ProductsService: container.resolve('ProductsService')
      }),
  };
};