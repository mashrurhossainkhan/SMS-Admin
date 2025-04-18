module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Attendance',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      date: {
        type: DataTypes.STRING,
        field: 'date',
      },

      class: {
        type: DataTypes.STRING,
        field: 'class',
      },

      
      section: {
        type: DataTypes.STRING,
        field: 'section',
      },
      teacherId: {
        type: DataTypes.BIGINT,
        field: 'teacherId',
      },
      studentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'studentId',
      },
      presentOrAbsent: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'presentOrAbsent',
      },
      visibility: {
        type: DataTypes.STRING,
        allowNull: false,
        default: true,
        field: 'visibility',
      },

      // Date: {
      //   type: DataTypes.DATE,
      //   field: 'date',
      // },

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
      tableName: 'Attendance',
    }
  );
};
