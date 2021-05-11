module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(100),
      },
      parentId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'categories',
          },
        },
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('categories'),
};
