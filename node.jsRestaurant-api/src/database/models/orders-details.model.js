module.exports = (sequelize, DataTypes) => {
  const Order_Details = sequelize.define(
    'Order_Details',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      order_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      product_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(6, 4),
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    },
    { tableName: 'orders_details' }
  );

  Order_Details.associate = (models) => {
    Order_Details.belongsTo(models.Product, { foreignKey: 'product_id' });
    Order_Details.belongsTo(models.Order, { foreignKey: 'order_id' });
    Order_Details.belongsTo(models.User, { foreignKey: 'created_by' });
  };

  return Order_Details;
};
