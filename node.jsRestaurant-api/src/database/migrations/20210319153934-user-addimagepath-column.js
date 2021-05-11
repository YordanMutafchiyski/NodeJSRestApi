module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('User', 'ImagePath', {
      type: Sequelize.STRING(),
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('User', 'ImagePath'),
};
