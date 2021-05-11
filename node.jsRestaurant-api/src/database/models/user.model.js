module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      authId: {
        type: DataTypes.STRING(100),
      },
      ImagePath: {
        type: DataTypes.STRING(),
      },
    },
    { tableName: 'User' }
  );

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'waiterId' });
  };

  return User;
};
