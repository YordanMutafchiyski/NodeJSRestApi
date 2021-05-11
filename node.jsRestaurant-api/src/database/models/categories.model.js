'use strict';
const models = require('.');
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    parentId: { type: DataTypes.INTEGER },
    
  },
  { tableName: 'categories' }
  );
  Category.associate = function (models) {
    models.Category.hasMany(models.Category, {
      onDelete: 'CASCADE',
      foreignKey: 'parentId',
      as: 'children',
    });
    Category.belongsToMany(models.Product, {
      through: 'product_categories',
      foreignKey: 'categories_id',
    });
  };

  return Category;
};
