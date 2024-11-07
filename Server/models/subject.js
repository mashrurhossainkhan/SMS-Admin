module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Subject',
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

      class: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'class',
      },

      section: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'section',
      },

      visibility: {
        type: DataTypes.STRING,
        allowNull: false,
        default: true,
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
      tableName: 'subject',
    }
  );
};
