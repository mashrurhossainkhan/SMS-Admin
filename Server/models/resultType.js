module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'ResultType',
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
          field: 'type',
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
        tableName: 'result_types', // Table name in the database
        timestamps: true, // Automatically manages createdAt and updatedAt
        paranoid: true, // Enables soft delete by using `deletedAt`
      }
    );
  };
  