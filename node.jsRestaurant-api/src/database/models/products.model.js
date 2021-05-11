module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true,
      },
      code: {
        allowNull: true,
        type: DataTypes.STRING(100),
        unique: true,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      imagePath: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      price: {
        allowNull: true,
        type: DataTypes.DECIMAL(6, 4),
      },
    },
    { tableName: 'products' }
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.Category, {
      through: 'product_categories',
      foreignKey: 'product_id',
    }),
      Product.hasMany(models.Order_Details, { foreignKey: 'product_id' });
  };

  return Product;
};
