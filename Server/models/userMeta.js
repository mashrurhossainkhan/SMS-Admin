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

      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'firstname',
      },

      middlename: {
        type: DataTypes.STRING,
        field: 'middlename',
      },

      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'lastname',
      },

      phnno: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phnno',
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
      tableName: 'usermeta',
    }
  );
};
