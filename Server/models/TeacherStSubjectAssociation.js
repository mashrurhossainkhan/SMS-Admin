module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'TeacherStSubjectAssociation',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      subjectId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'subjectId',
      },

      stId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'stId',
      },

      teacherId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'teacherId',
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
      tableName: 'teacherStSubjectAssociation',
    }
  );
};
