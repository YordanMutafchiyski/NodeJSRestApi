const awilix = require('awilix');
const routeBuilder = require('../../utils/route-builder');
const { TablesService } = require('./services');
const { TablesController } = require('./controllers');

module.exports = (container) => {
  container.register({
    TablesService: awilix.asFunction(TablesService),
  });

  return {
    router: () =>
      routeBuilder(TablesController, {
        TablesService: container.resolve('TablesService')
      }),
  };
};