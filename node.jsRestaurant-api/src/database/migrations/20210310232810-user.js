module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(100),
      },
      firstName: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING(100),
      },
      lastName: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING(100),
      },
      authId: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING(100),
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('User'),
};
