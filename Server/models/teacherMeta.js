module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "teacherMeta",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: "id",
        },
  
        userid: {
          type: DataTypes.BIGINT,
          allowNull: false,
          unique: true, // Ensures one entry per teacher
          field: "userid",
        },
  
        highestQualification: {
          type: DataTypes.STRING,
          field: "highestQualification",
        },
  
        experienceYears: {
          type: DataTypes.INTEGER,
          field: "experienceYears",
        },
  
        subjectsTaught: {
          type: DataTypes.STRING, // Store subjects as comma-separated values (CSV)
          field: "subjectsTaught",
        },
  
        contactNumber: {
          type: DataTypes.STRING,
          field: "contactNumber",
        },
  
        emergencyContact: {
          type: DataTypes.STRING,
          field: "emergencyContact",
        },
  
        address: {
          type: DataTypes.TEXT,
          field: "address",
        },
  
        dateOfJoining: {
          type: DataTypes.DATE,
          field: "dateOfJoining",
        },
  
        salary: {
          type: DataTypes.FLOAT,
          field: "salary",
        },
  
        createdAt: {
          type: DataTypes.DATE,
          field: "createdAt",
        },
  
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "updatedAt",
        },
  
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "deletedAt",
        },
      },
      {
        tableName: "teacherMeta",
      }
    );
  };
  