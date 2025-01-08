module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'Debit',
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'type', // Example: 'bonus', 'refund', etc.
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          field: 'amount',
        },
        userId: {
          type: DataTypes.BIGINT,
          field: 'userId',
          references: {
            model: 'user', // Assumes the user table is named 'user'
            key: 'id',
          },
        },
        comment: {
          type: DataTypes.STRING,
          field: 'comment',
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'date',
          defaultValue: DataTypes.NOW, // Defaults to the current date and time
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
        tableName: 'debits', 
        timestamps: true,
        paranoid: true,
      }
    );
  };
  