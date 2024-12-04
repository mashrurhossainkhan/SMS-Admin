const models = require('../models');
const Attendance = models.attendance;

// Post attendance
const insertAttendanceRecords = async (req, res) => {
  try {
    const { attendanceData } = req.body;

    console.log(`AttendanceData: ${JSON.stringify(attendanceData)}`);
    console.log('Request Body:', JSON.stringify(req.body, null, 2));

    // Validate the attendance data
    if (!attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({
        message:
          'Invalid data format. Expected an array of attendance records.',
      });
    }

    // Validate each record's required fields
    const invalidRecords = attendanceData.filter((record) => {
      const isValid =
        record.teacherId &&
        record.studentId &&
        record.associationId &&
        record.presentOrAbsent !== undefined;

      if (!isValid) {
        console.log('Invalid record:', record);
      }

      return !isValid;
    });

    if (invalidRecords.length > 0) {
      return res.status(400).json({
        message: 'Some attendance records are missing required fields.',
        invalidRecords,
      });
    }

    // Prepare attendance records for insertion
    const recordsToInsert = attendanceData.map((record) => ({
      teacherId: record.teacherId,
      studentId: record.studentId,
      teacherStAssociationId: record.associationId,
      presentOrAbsent: record.presentOrAbsent,
      visibility: true, // Default value
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    console.log('Records to insert:', recordsToInsert);

    // Bulk insert into Attendance table
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
