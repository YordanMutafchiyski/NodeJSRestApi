const { UserModule } = require('./user');
const { Auth0Module } = require('./auth0');
const { CategoriesModule} = require('./categories');
const { TablesModule } = require('./tables');
const {ProductsModule} = require('./products');
const {OrdersModule} = require('./orders');
const {OrdersDetailsModule} = require('./order-details');
module.exports = [TablesModule, UserModule, Auth0Module, CategoriesModule, ProductsModule, OrdersModule,OrdersDetailsModule];
