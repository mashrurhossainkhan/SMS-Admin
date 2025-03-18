module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'PermissionMain',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      permissionTypeId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'permissionTypeId',
        references: {
          model: 'permissions', // Reference to the `permissions` table
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'userId',
        references: {
          model: 'user', // Reference to the `user` table
          key: 'id',
        },
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
      tableName: 'permission_main',
      timestamps: true,
      paranoid: true, // Enables soft deletion
    }
  );
};
