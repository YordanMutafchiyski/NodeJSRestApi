module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(100),
        unique: true,
      },
      capacity: {
        allowNull: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('tables'),
};
