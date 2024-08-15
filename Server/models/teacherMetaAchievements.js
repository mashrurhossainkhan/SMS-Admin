module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'TeacherMetaAchievement',
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

      achivementTitle: {
        type: DataTypes.STRING,
        field: 'achivementTitle',
      },

      achivementDetails: {
        type: DataTypes.STRING,
        field: 'achivementDetails',
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
      tableName: 'teachermetaachievement',
    }
  );
};
