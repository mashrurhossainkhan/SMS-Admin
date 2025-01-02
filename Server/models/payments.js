module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      'Payment',
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
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          field: 'amount',
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
        tableName: 'payments',
        timestamps: true,
        paranoid: true, // Enables soft delete by using `deletedAt`
      }
    );
  };
  