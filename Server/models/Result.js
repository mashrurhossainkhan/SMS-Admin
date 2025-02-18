module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'Result',
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
        },
        resultType: {
          type: DataTypes.BIGINT,
          allowNull: false,
          field: 'resultType',
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
        // associationId: {
        //   type: DataTypes.BIGINT,
        //   allowNull: false,
        //   field: 'associationId',
        // },
        marks: {
          type: DataTypes.BIGINT,
          allowNull: false,
          field: 'marks',
        },
        remarks: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'remarks',
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
        tableName: 'results', // Table name in the database
        timestamps: true, // Automatically manages createdAt and updatedAt
        paranoid: true, // Enables soft delete
      }
    );
  };
  