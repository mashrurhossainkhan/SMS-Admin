module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Teacher',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
      },

      designation: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'designation',
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'image',
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
      tableName: 'teacher',
    }
  );
};
