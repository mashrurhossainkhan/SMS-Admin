module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'studentmeta',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },

      rollNo: {
        type: DataTypes.STRING,
        field: 'rollNo',
      },

      class: {
        type: DataTypes.STRING,
        field: 'class',
      },

      section: {
        type: DataTypes.STRING,
        field: 'section',
      },

      userid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'userid',
      },

      fatherName: {
        type: DataTypes.STRING,
        field: 'fatherName',
      },

      fatherOccupation: {
        type: DataTypes.STRING,
        field: 'fatherOccupation',
      },

      fatherPhoneNumer: {
        type: DataTypes.STRING,
        field: 'fatherPhoneNumer',
      },

      motherName: {
        type: DataTypes.STRING,
        field: 'motherName',
      },

      motherOccupation: {
        type: DataTypes.STRING,
        field: 'motherOccupation',
      },

      
      motherPhoneNumber: {
        type: DataTypes.STRING,
        field: 'motherPhoneNumber',
      },

      localGuardianName: {
        type: DataTypes.STRING,
        field: 'localGuardianName',
      },

      localGuardianOccupation: {
        type: DataTypes.STRING,
        field: 'localGuardianOccupation',
      },


      localGuardianPhoneNumber: {
        type: DataTypes.STRING,
        field: 'localGuardianPhoneNumber',
      },

      presentAddress: {
        type: DataTypes.STRING,
        field: 'presentAddress',
      },

      permanentAddress: {
        type: DataTypes.STRING,
        field: 'permanentAddress',
      },

      relationWithLocalguardian:{
        type: DataTypes.STRING,
        field: 'relationWithLocalguardian',
      },

      nationalIdCard: {
        type: DataTypes.STRING,
        field: 'nationalIdCard',
      },

      birthCertificate: {
        type: DataTypes.STRING,
        field: 'birthCertificate',
      },

      birthCertificate: {
        type: DataTypes.STRING,
        field: 'birthCertificate',
      },

      phoneNumber: {
        type: DataTypes.STRING,
        field: 'phoneNumber',
      },

      createdAt: {
        type: DataTypes.DATE,
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
