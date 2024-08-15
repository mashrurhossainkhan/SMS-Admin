module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'TeacherMeta',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },

      teacherid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        field: 'teacherid',
      },

      classname: {
        type: DataTypes.STRING,
        field: 'classname',
      },

      subject: {
        type: DataTypes.STRING,
        field: 'subject',
      },

      details: {
        type: DataTypes.STRING,
        field: 'details',
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
      tableName: 'teachermeta',
    }
  );
};
