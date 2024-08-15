const bcrypt = require('bcrypt');
const models = require('../models');
const Student = models.student;

exports.studentSignup = async function (req, res) {
  let body = req.body;
  try {
    let hashedPass = await bcrypt.hashSync(body.password, 8);

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
