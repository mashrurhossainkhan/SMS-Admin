module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Usermeta',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },

      userid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'userid',
      },

      fieldName: {
        type: DataTypes.STRING,
        field: 'fieldName',
      },

      fieldTitle: {
        type: DataTypes.STRING,

        field: 'fieldTitle',
      },

      createdAt: {
        type: DataTypes.DATE,
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
      tableName: 'usermeta',
    }
  );
};
