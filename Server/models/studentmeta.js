module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'StudentMeta',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },

      stname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stname',
      },

      stfathername: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stfathername',
      },

      stmothername: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stmothername',
      },

      stpresentaddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stpresentaddress',
      },

      stpermanentaddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stpermanentaddress',
      },

      stfatherphnno: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stfatherphnno',
      },

      stmotherphnno: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stmotherphnno',
      },

      stnationality: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'stnationality',
      },

      stfatherNID: {
        type: DataTypes.STRING,
        field: 'stfatherNID',
      },

      stmotherNID: {
        type: DataTypes.STRING,
        field: 'stmotherNID',
      },

      stbirthcertificates: {
        type: DataTypes.STRING,
        field: 'stbirthcertificates',
      },

      stbday: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'stbday',
      },

      admissiondate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'admissiondate',
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
      tableName: 'studentmeta',
    }
  );
};
