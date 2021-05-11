const awilix = require('awilix');
const routeBuilder = require('../../utils/route-builder');
const { CategoriesService } = require('./services');
const { CategoriesController } = require('./controllers');

module.exports = (container) => {
  container.register({
    CategoriesService: awilix.asFunction(CategoriesService),
  });

  return {
    router: () =>
      routeBuilder(CategoriesController, {
        CategoriesService: container.resolve('CategoriesService')
      }),
  };
};
