const models = require('../models');
const Attendance = models.attendance;

const isSameDate = (recordDate, todayDate) => {
  const recordDateOnly = recordDate.toISOString().split('T')[0]; // Extract date part
  return recordDateOnly === todayDate;
};
// Post attendance
const insertAttendanceRecords = async (req, res) => {
  try {
    const { attendanceData } = req.body;

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

    // Get today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split('T')[0];

    // Loop through attendance records and update or insert as necessary
    for (const record of attendanceData) {
      const existingRecord = await Attendance.findOne({
        where: {
          studentId: record.studentId,
          //createdAt.toISOString().split('T')[0]: todayDate, // Only check for records with today's date
        },
      });
   
      if (existingRecord && isSameDate(existingRecord.createdAt, todayDate)) {
        // Update the existing record
        await existingRecord.update({
          teacherId: record.teacherId,
          teacherStAssociationId: record.associationId,
          presentOrAbsent: record.presentOrAbsent,
          updatedAt: new Date(),
        });
        console.log(
          `Updated record for studentId: ${record.studentId}, createdAt: ${todayDate}`
        );
      } else {
        // Insert a new record
        await Attendance.create({
          teacherId: record.teacherId,
          studentId: record.studentId,
          teacherStAssociationId: record.associationId,
          presentOrAbsent: record.presentOrAbsent,
          visibility: true,
          createdAt: todayDate, // Only the date part
          updatedAt: new Date(),
        });
        console.log(
          `Inserted record for studentId: ${record.studentId}, createdAt: ${todayDate}`
        );
      }
    }

    res
      .status(201)
      .json({ message: 'Attendance records processed successfully.' });
  } catch (error) {
    console.error('Error inserting/updating attendance records:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = { insertAttendanceRecords };
