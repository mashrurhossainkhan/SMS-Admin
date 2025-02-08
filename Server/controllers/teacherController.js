const bcrypt = require('bcrypt');
const models = require('../models');
const Teacher = models.user;
const TeacherMeta = models.teacherMeta;


exports.getAllTeachers = async (req, res) => {
  try {
    const students = await Teacher.findAll({
      where: { userType: 3 }, // Filter for students
    });

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch students.",
      error: error.message,
    });
  }
};

exports.insertTeacherInfo = async function (req, res) {
  let body = req.body;
  try {
    await Teacher.create({
      name: body.name,
      designation: body.designation,
      image: body.image,
      visibility: 'true',
    })
      .then((techer) => {
        return res.send({
          teacherId: techer.id, //this id will be in frontend
        });
      })
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
      });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};
