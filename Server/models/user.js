module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
      },

      name: {
        type: DataTypes.STRING,
        field: 'name',
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email',
      },

      userType: {
        type: DataTypes.BIGINT,
        field: 'userType',
      },

      visibility: {
        type: DataTypes.STRING,
        allowNull: false,
        default: false,
        field: 'visibility',
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'createdAt',
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updatedAt',
      },

      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deletedAt',
      },
    },
    {
      tableName: 'user',
    }
  );
};
