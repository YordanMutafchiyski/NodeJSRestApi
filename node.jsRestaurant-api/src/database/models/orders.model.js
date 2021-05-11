module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      waiterId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      tableId: {
        allowNull: false,
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
    { tableName: 'orders' }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'waiterId' });
    Order.belongsTo(models.Table);
    Order.hasMany(models.Order_Details, { foreignKey: 'order_id' });
  };

  return Order;
};
