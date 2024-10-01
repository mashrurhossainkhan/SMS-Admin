module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Achievements',
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
      imageOrVideoPath: {
        type: DataTypes.STRING,
        field: 'imageOrVideoPath',
      },
      details: {
        type: DataTypes.STRING,
        field: 'details',
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
      tableName: 'achievements',
    }
  );
};
