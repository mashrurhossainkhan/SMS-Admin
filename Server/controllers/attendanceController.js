const models = require('../models');
const { Sequelize } = require('sequelize'); 
const { sequelize } = require('../models'); // Ensure this path is correct
const StudentMeta = models.studentMeta;
const User = models.user;
const Attendance = models.attendance;


exports.getAllUniqueClassesOrdered = async function (req, res) {
  try {
    const uniqueClasses = await StudentMeta.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('class')), 'class']],
      raw: true,
    });

    // Extract class values and sort numerically
    const sortedClasses = uniqueClasses
      .map(item => parseInt(item.class, 10)) // Convert to number
      .filter(num => !isNaN(num)) // Ensure valid numbers
      .sort((a, b) => a - b); // Numeric sorting

    res.send(sortedClasses);
  } catch (error) {
    console.error('Error fetching unique classes:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};



// Get Sections by Class
exports.getSectionsByClass = async function (req, res) {
  try {
    const classNumber = req.params.classNumber; // Get class from URL param

    if (!classNumber) {
      return res.status(400).json({ error: "Class number is required" });
    }

    const sections = await StudentMeta.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("section")), "section"]],
      where: { class: classNumber },
      raw: true,
    });

    const sectionList = sections.map((item) => item.section); // Extract section values
    res.json(sectionList);
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get roll numbers and user names by class and section
exports.getRollNumbersByClassAndSection = async function (req, res) {
  try {
    const { classNumber, section } = req.params;

    if (!classNumber || !section) {
      return res.status(400).json({ error: "Class and section are required" });
    }

    // Fetch roll numbers and corresponding user IDs
    const students = await StudentMeta.findAll({
      attributes: ["rollNo", "userid"],
      where: { class: classNumber, section: section },
      raw: true,
    });

    if (students.length === 0) {
      return res.json([]); // Return an empty array if no students found
    }

    // Extract unique user IDs
    const userIds = students.map((student) => student.userid);

    // Fetch user names based on user IDs
    const users = await User.findAll({
      attributes: ["id", "name"],
      where: { id: userIds }, // Get users with matching IDs
      raw: true,
    });

    // Convert users array into an object for quick lookup
    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user.name;
    });

    // Merge roll numbers with user names
    const result = students.map((student) => ({
      rollNo: student.rollNo,
      userId: student.userid,
      name: userMap[student.userid] || "Unknown", // Default to "Unknown" if no match found
    }));

    console.log(result)

    res.json(result);
  } catch (error) {
    console.error("Error fetching roll numbers and user names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


















exports.markOrUpdateAttendance = async function (req, res) {
  try {
    const { teacherId, classNumber, section, attendanceData } = req.body;

    if (!teacherId || !classNumber || !section || !attendanceData) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    // Iterate through the attendance data and update or create records
    for (const student of attendanceData) {
      const studentId = student.studentId; // Directly use studentId

      if (!studentId) continue; // Skip if student ID is missing

      const existingRecord = await Attendance.findOne({
        where: { date: today, studentId: studentId, class: classNumber, section: section },
      });

      if (existingRecord) {
        // Update existing record
        await Attendance.update(
          { presentOrAbsent: student.present ? 1 : 0, teacherId },
          { where: { id: existingRecord.id } }
        );
      } else {
        // Create new record
        await Attendance.create({
          date: today,
          teacherId: teacherId,
          studentId: studentId,
          class: classNumber,
          section: section,
          presentOrAbsent: student.present ? 1 : 0,
          visibility: 1
        });
      }
    }

    res.json({ message: "Attendance recorded successfully." });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//for attendance history
exports.getAllAttendanceDates = async function (req, res) {
  try {
    const dates = await Attendance.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("date")), "date"]],
      order: [["date", "DESC"]], // Order by latest dates
      limit: 1, // Get only the last 90 records
      raw: true,
    });

    const uniqueDates = dates.map((entry) => entry.date);

    res.json(uniqueDates);
  } catch (error) {
    console.error("Error fetching attendance dates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.getClassSectionsAndStudentsByDate = async function (req, res) {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ error: "Date is required." });
    }

    // Get all unique class-section pairs for the given date
    const classSectionsQuery = `
      SELECT DISTINCT class, section 
      FROM Attendance 
      WHERE date = :date;
    `;
    const classSections = await sequelize.query(classSectionsQuery, {
      replacements: { date },
      type: sequelize.QueryTypes.SELECT,
    });

    const result = [];

    for (const record of classSections) {
      const { class: classNumber, section } = record;

      // Fetch student attendance using raw SQL
      const studentQuery = `
        SELECT a.studentId, u.name AS studentName, sm.rollNo, a.presentOrAbsent
        FROM Attendance a
        JOIN user u ON a.studentId = u.id  -- Get name from User table
        JOIN studentmeta sm ON u.id = sm.userid  -- Get rollNo from studentmeta
        WHERE a.date = :date
        AND a.class = :classNumber
        AND a.section = :section;
      `;

      const students = await sequelize.query(studentQuery, {
        replacements: { date, classNumber, section },
        type: sequelize.QueryTypes.SELECT,
      });

      result.push({
        class: classNumber,
        section,
        students,
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching class, sections, and students by date:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
