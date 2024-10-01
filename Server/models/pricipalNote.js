module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'PrincipalNote',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'note',
      },
      videoOrImage: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'videoOrImage',
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
      tableName: 'principalnote',
    }
  );
};
