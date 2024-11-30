const models = require('../models');
const TeacherStSubjectAssociation = models.TeacherStSubjectAssociation;
const Attendance = models.attendance;

// Post attendance
const insertAttendanceRecords = async (req, res) => {
  try {
    const { attendanceData } = req.body;

    console.log(`attendanceData: ${attendanceData}`);
    if (!attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({
        message:
          'Invalid data format. Expected an array of attendance records.',
      });
    }

    // Prepare attendance records for bulk insert
    const recordsToInsert = attendanceData.map((record) => ({
      teacherStAssociationId: record.associationId,
      teacherId: record.teacherId,
      studentId: record.studentId,
      presentOrAbsent: record.presentOrAbsent ? 1 : 0,
      visibility: true, // Default value
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Bulk insert into Attendance model
    await Attendance.bulkCreate(recordsToInsert);

    res
      .status(201)
      .json({ message: 'Attendance records inserted successfully.' });
  } catch (error) {
    console.error('Error inserting attendance records:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = { insertAttendanceRecords };
