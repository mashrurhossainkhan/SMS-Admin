const models = require('../models');
const TeacherStSubjectAssociation = models.TeacherStSubjectAssociation;
const Attendance = models.attendance;

// Post attendance
const postAttendance = async (req, res) => {
  const { teacherId, attendanceData } = req.body; // attendanceData: Array of { studentId, presentOrAbsent }
  if (!teacherId || !attendanceData) {
    return res
      .status(400)
      .json({ error: 'teacherId and attendanceData are required' });
  }

  try {
    // Fetch students associated with the teacher
    const associations = await TeacherStSubjectAssociation.findAll({
      where: { teacherId, visibility: true }, // Ensure the visibility is 'true' for valid associations
      attributes: ['stId'],
    });

    if (!associations.length) {
      return res
        .status(404)
        .json({ error: 'No students found for the given teacherId' });
    }

    const studentIds = associations.map((assoc) => assoc.stId);

    // Filter attendanceData to only include students associated with this teacher
    const validAttendanceData = attendanceData.filter((attendance) =>
      studentIds.includes(attendance.studentId)
    );

    if (!validAttendanceData.length) {
      return res.status(400).json({
        error: 'No valid students found in the provided attendance data',
      });
    }

    // Insert attendance records in bulk
    const attendanceRecords = validAttendanceData.map((data) => ({
      teacherId,
      studentId: data.studentId,
      teacherStAssociationId: associations.find(
        (assoc) => assoc.stId === data.studentId
      )?.id,
      presentOrAbsent: data.presentOrAbsent,
      visibility: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Attendance.bulkCreate(attendanceRecords);

    res.status(201).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while recording attendance' });
  }
};

module.exports = { postAttendance };
