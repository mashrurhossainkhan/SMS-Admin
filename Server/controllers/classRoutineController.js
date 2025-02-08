const models = require('../models');
const ClassRoutine = models.classRoutine;
const Subject = models.subject;

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

// 📌 Get All Class Routines
exports.getAllClassRoutines = async (req, res) => {
    try {
      const classRoutines = await ClassRoutine.findAll({
        include: [
          {
            model: Subject, // Join with Subject model
            as: "subject", // This alias must match your association
            attributes: ["id", "name"], // Fetch subject name
          },
        ],
      });
  
      // Transform response to replace subjectId with subjectName
      const formattedRoutines = classRoutines.map((routine) => ({
        ...routine.toJSON(),
        subjectName: routine.subject ? routine.subject.name : "Unknown Subject",
      }));
  
      res.status(200).json({
        success: true,
        data: formattedRoutines,
      });
    } catch (error) {
      console.error("Error fetching class routines:", error);
      res.status(500).json({
        success: false,
        message: "Server error. Could not fetch class routines.",
        error: error.message,
      });
    }
}

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
