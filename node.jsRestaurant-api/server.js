require('dotenv').config();

const express = require('express');
const middlewareConfig = require('./src/config/middleware');
const AppModules = require('./src/modules');

const awilix = require('awilix');
const { sequelize, models } = require('./src/database/connection');

const port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(express.static('public'));

middlewareConfig(app);

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  sequelize: awilix.asFunction(() => sequelize),
  models: awilix.asFunction(() => models),
});

AppModules.map((module) => module(container))
  .filter((module) => module && module.router)
  .map((module) => app.use('/api', module.router()));

app.listen(port, process.env.HOST || '127.0.0.1', () => {
  console.log(`Server listening on port ${port}...`);
});
