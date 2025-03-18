module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Permission',
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
        unique: true, // Ensures no duplicate permission types
        field: 'type', // Examples: 'read', 'write', 'delete', 'admin'
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
      tableName: 'permissions',
      timestamps: true,
      paranoid: true, // Enables soft delete (deletedAt will be set instead of hard delete)
    }
  );
};
