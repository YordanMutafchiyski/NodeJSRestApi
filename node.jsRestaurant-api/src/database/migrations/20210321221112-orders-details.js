module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('orders_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      order_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      product_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(6, 4),
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      updated_by: {
        type: Sequelize.INTEGER,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('orders_details'),
};
