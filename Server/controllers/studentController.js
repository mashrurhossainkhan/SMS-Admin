const bcrypt = require('bcrypt');
const models = require('../models');
const Student = models.user;
const User = models.user;
const PermissionMain = models.permissionMain;
const StudentMeta = models.studentMeta;

exports.studentSignup = async function (req, res) {
  let body = req.body;
  try {
    let hashedPass = bcrypt.hashSync(body.password, 8);

    await Student.create({
      password: hashedPass,
      phoneNo: body.phoneNo,
      visibility: 'true',
    })
      .then((student) => {
        return res.send({
          studentId: student.id, //this id will be in frontend
        });
      })
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
      });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

exports.studentSignin = async function (req, res) {
  let body = req.body;
  try {
    const studentUser = await Student.findOne({ phoneNo: body.phoneNo });

    if (studentUser) {
      if (
        bcrypt.compareSync(req.body.password, studentUser.dataValues.password)
      ) {
        res.send({
          id: studentUser.id,
          phoneNo: studentUser.phoneNo,
          token: generateToken(studentUser),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      where: { userType: 2 }, // Filter for students
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch students.',
      error: error.message,
    });
  }
};

// 📌 Function to update student by ID
exports.updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, visibility } = req.body; // Fields to update

    // Find student by ID
    const student = await Student.findByPk(id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }

    // Update student details
    await student.update({ name, email, visibility });

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not update student.',
      error: error.message,
    });
  }
};

exports.deleteStudentById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Step 1: Delete related records in permission_main
    await PermissionMain.destroy({ where: { userId } });

    // Step 2: Now delete the student
    const result = await User.destroy({ where: { id: userId } });

    if (result) {
      res
        .status(200)
        .json({ success: true, message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// 📌 Create Student Meta Data
exports.createStudentMeta = async (req, res) => {
  try {
    const studentMeta = await StudentMeta.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Student metadata created successfully',
      data: studentMeta,
    });
  } catch (error) {
    console.error('Error creating student metadata:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not create student metadata.',
      error: error.message,
    });
  }
};

// 📌 Get Student Meta Data by User ID
exports.getStudentMetaById = async (req, res) => {
  try {
    const { userid } = req.params;

    const studentMeta = await StudentMeta.findOne({ where: { userid } });

    if (!studentMeta) {
      return res
        .status(404)
        .json({ success: false, message: 'Student metadata not found' });
    }

    res.status(200).json({
      success: true,
      data: studentMeta,
    });
  } catch (error) {
    console.error('Error fetching student metadata:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch student metadata.',
      error: error.message,
    });
  }
};

// 📌 Update Student Meta Data by User ID
exports.updateStudentMetaById = async (req, res) => {
  try {
    const { userid } = req.params;
    const updatedFields = req.body;

    // Find existing metadata
    const studentMeta = await StudentMeta.findOne({ where: { userid } });

    if (!studentMeta) {
      return res
        .status(404)
        .json({ success: false, message: 'Student metadata not found' });
    }

    // Update metadata
    await studentMeta.update(updatedFields);

    res.status(200).json({
      success: true,
      message: 'Student metadata updated successfully',
      data: studentMeta,
    });
  } catch (error) {
    console.error('Error updating student metadata:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not update student metadata.',
      error: error.message,
    });
  }
};
