module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      'Speeches',
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
        },
        speechBy: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'speechBy',
        },
        speech: {
          type: DataTypes.TEXT, // Supports long text
          allowNull: false,
          field: 'speech',
        },
        visibility: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'true', // Default value for visibility
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
        tableName: 'speeches',
        timestamps: true, // Enables automatic handling of createdAt and updatedAt
        paranoid: true, // Enables soft deletes
      }
    );
  };
  