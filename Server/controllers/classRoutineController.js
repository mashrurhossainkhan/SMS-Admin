const models = require('../models');
const ClassRoutine = models.classRoutine;
const { sequelize } = require("../models");

// 📌 Create Class Routine
exports.createClassRoutine = async (req, res) => {
  try {
    const classRoutine = await ClassRoutine.create(req.body);
    res.status(201).json({
      success: true,
      message: "Class routine created successfully",
      data: classRoutine,
    });
  } catch (error) {
    console.error("Error creating class routine:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not create class routine.",
      error: error.message,
    });
  }
};

exports.getAllClassRoutines = async (req, res) => {
  try {
    const { teacherId, class: classFilter, day, subjectId } = req.query; // Accept filters from frontend

    // Dynamically build the WHERE clause
    let whereConditions = [];
    if (teacherId) whereConditions.push(`cr.teacherId = ${teacherId}`);
    if (classFilter) whereConditions.push(`cr.class = '${classFilter}'`);
    if (day) whereConditions.push(`cr.day = '${day.toUpperCase()}'`);
    if (subjectId) whereConditions.push(`cr.subjectId = ${subjectId}`);

    // Combine conditions if any exist
    let whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    const query = `
      SELECT 
        cr.id,
        cr.day,
        cr.startTime,
        cr.endTime,
        cr.class,
        cr.section,
        cr.roomNumber,
        cr.subjectId,
        s.name AS subjectName,
        cr.teacherId,
        u.name AS teacherName
      FROM classRoutine cr
      LEFT JOIN subject s ON cr.subjectId = s.id
      LEFT JOIN user u ON cr.teacherId = u.id
      ${whereClause}  -- Apply filters dynamically
      ORDER BY 
        FIELD(cr.day, 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'),
        cr.startTime ASC;
    `;

    const classRoutines = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      success: true,
      data: classRoutines,
    });
  } catch (error) {
    console.error("Error fetching class routines:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch class routines.",
      error: error.message,
    });
  }
};


// 📌 Get Class Routine by ID
exports.getClassRoutineById = async (req, res) => {
  try {
    const { id } = req.params;
    const classRoutine = await ClassRoutine.findByPk(id);

    if (!classRoutine) {
      return res.status(404).json({ success: false, message: "Class routine not found" });
    }

    res.status(200).json({
      success: true,
      data: classRoutine,
    });
  } catch (error) {
    console.error("Error fetching class routine:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch class routine.",
      error: error.message,
    });
  }
};

// 📌 Update Class Routine by ID
exports.updateClassRoutineById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const classRoutine = await ClassRoutine.findByPk(id);

    if (!classRoutine) {
      return res.status(404).json({ success: false, message: "Class routine not found" });
    }

    await classRoutine.update(updatedFields);

    res.status(200).json({
      success: true,
      message: "Class routine updated successfully",
      data: classRoutine,
    });
  } catch (error) {
    console.error("Error updating class routine:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not update class routine.",
      error: error.message,
    });
  }
};

// 📌 Delete Class Routine (Soft Delete)
exports.deleteClassRoutineById = async (req, res) => {
  try {
    const { id } = req.params;

    const classRoutine = await ClassRoutine.findByPk(id);

    if (!classRoutine) {
      return res.status(404).json({ success: false, message: "Class routine not found" });
    }

    await classRoutine.destroy(); // Soft delete

    res.status(200).json({
      success: true,
      message: "Class routine deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting class routine:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not delete class routine.",
      error: error.message,
    });
  }
};
