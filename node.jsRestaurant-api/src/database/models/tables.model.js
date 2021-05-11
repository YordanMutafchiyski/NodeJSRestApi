module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define(
    'Table',
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
      },
      capacity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    { tableName: 'tables' }
  );

  Table.associate = (models) => {
    Table.hasMany(models.Order, { foreignKey: 'tableId' });
  };

  return Table;
};
