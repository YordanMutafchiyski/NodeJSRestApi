module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('products', 'price', {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: false,
    }),

  down: (queryInterface) => queryInterface.removeColumn('products', 'price'),
};
