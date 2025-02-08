const models = require('../models');
const TeacherMeta = models.teacherMeta;

// 📌 Create Teacher Meta Data
exports.createTeacherMeta = async (req, res) => {
  try {
    const teacherMeta = await TeacherMeta.create(req.body);
    res.status(201).json({
      success: true,
      message: "Teacher metadata created successfully",
      data: teacherMeta,
    });
  } catch (error) {
    console.error("Error creating teacher metadata:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not create teacher metadata.",
      error: error.message,
    });
  }
};

// 📌 Get Teacher Meta Data by User ID
exports.getTeacherMetaById = async (req, res) => {
  try {
    const { userid } = req.params;

    const teacherMeta = await TeacherMeta.findOne({ where: { userid } });

    if (!teacherMeta) {
      return res.status(404).json({ success: false, message: "Teacher metadata not found" });
    }

    res.status(200).json({
      success: true,
      data: teacherMeta,
    });
  } catch (error) {
    console.error("Error fetching teacher metadata:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch teacher metadata.",
      error: error.message,
    });
  }
};

// 📌 Update Teacher Meta Data by User ID
exports.updateTeacherMetaById = async (req, res) => {
  try {
    const { userid } = req.params;
    const updatedFields = req.body;

    const teacherMeta = await TeacherMeta.findOne({ where: { userid } });

    if (!teacherMeta) {
      return res.status(404).json({ success: false, message: "Teacher metadata not found" });
    }

    await teacherMeta.update(updatedFields);

    res.status(200).json({
      success: true,
      message: "Teacher metadata updated successfully",
      data: teacherMeta,
    });
  } catch (error) {
    console.error("Error updating teacher metadata:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not update teacher metadata.",
      error: error.message,
    });
  }
};

// 📌 Delete Teacher Meta Data by User ID
exports.deleteTeacherMetaById = async (req, res) => {
  try {
    const { userid } = req.params;

    const teacherMeta = await TeacherMeta.findOne({ where: { userid } });

    if (!teacherMeta) {
      return res.status(404).json({ success: false, message: "Teacher metadata not found" });
    }

    await teacherMeta.destroy();

    res.status(200).json({
      success: true,
      message: "Teacher metadata deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting teacher metadata:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not delete teacher metadata.",
      error: error.message,
    });
  }
};
