'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_categories', {
      product_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'products',
          },
        },
      },
      categories_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'categories',
          },
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_categories');
  },
};
