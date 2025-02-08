module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "classRoutine",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: "id",
        },
  
        day: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "day",
          validate: {
            isIn: [["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]],
          },
          set(value) {
            this.setDataValue("day", value.toUpperCase()); // Convert input to uppercase
          },
        },
  
        startTime: {
          type: DataTypes.TIME,
          allowNull: false,
          field: "startTime",
        },
  
        endTime: {
          type: DataTypes.TIME,
          allowNull: false,
          field: "endTime",
        },
  
        subjectId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          field: "subjectId",
        },
  
        teacherId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          field: "teacherId",
        },
  
        roomNumber: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "roomNumber",
        },
  
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
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
        tableName: "classRoutine",
      }
    );
  };
  