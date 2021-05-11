const Sequelize = require('sequelize').Sequelize;
const dbConfig = require('./config/dbConfig');
const models = require('./models');

const sequelize = new Sequelize(dbConfig.development);

Object.values(models).map((model) => model(sequelize, Sequelize.DataTypes));

Object.values(sequelize.models).forEach((model) =>
  model.associate(sequelize.models)
);

module.exports = {
  sequelize,
  models: sequelize.models,
};
