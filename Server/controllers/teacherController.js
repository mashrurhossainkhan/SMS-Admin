const bcrypt = require('bcrypt');
const models = require('../models');
const Teacher = models.teacher;
const TeacherMeta = models.teacherMeta;

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
