module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Fees',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'class',
      },
      fees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'fees',
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
      tableName: 'Fees',
      paranoid: true, // enables soft deletes using `deletedAt`
      timestamps: true, // enables automatic `createdAt` and `updatedAt`
    }
  );
};
