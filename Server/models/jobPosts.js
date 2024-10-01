module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'JobPosts',
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
      details: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'details',
      },

      lastApplyDate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'lastApplyDate',
      },
      sentCvAt: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'sentCvAt',
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
      tableName: 'jobPosts',
    }
  );
};
