'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('categories', 'description', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('categories', 'imagePath', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addConstraint('categories', {
        fields: ['name'],
        type: 'unique',
        name: 'custom_unique_constraint_name',
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('categories', 'description'),
      queryInterface.removeColumn('categories', 'image'),
      queryInterface.removeConstraint(
        'categories',
        'custom_unique_constraint_name'
      ),
    ]);
  },
};
