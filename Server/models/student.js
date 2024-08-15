module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Student',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'phoneNo',
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
      tableName: 'student',
    }
  );
};
