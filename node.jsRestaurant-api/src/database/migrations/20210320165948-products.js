module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('products', {
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
      code: {
        allowNull: true,
        type: Sequelize.STRING(100),
        unique: true,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      imagePath: {
        allowNull: true,
        type: Sequelize.STRING(),
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('products'),
};
