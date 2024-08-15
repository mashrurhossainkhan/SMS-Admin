module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'NoticeBoard',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date',
      },

      noticeTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'noticeTitle',
      },

      noticeDetails: {
        type: DataTypes.TEXT,
        field: 'noticeDetails',
      },

      noticeFile: {
        type: DataTypes.STRING,
        field: 'noticeFile',
      },

      visibility: {
        type: DataTypes.STRING,
        allowNull: false,
        default: false,
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
      tableName: 'notice_board',
    }
  );
};
