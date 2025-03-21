const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Model import
const models = require('../models');
const { name } = require('../strategies/jwt');
const User = models.user;
const StudentMeta = models.studentMeta;
const TeacherStSubjectAssociation = models.TeacherStSubjectAssociation;

//http://localhost:5000/api/user/login
exports.login = async function (req, res) {
  let body = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Email is not correct!' });
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (isMatch) {
      let studentMetaData = {}; // Default empty object

      // If userType is 2, fetch class, rollNo, and section from studentMeta
      if (user.userType === 2) {
        const studentMeta = await StudentMeta.findOne({
          where: { userid: user.id },
        });

        if (studentMeta) {
          studentMetaData = {
            class: studentMeta.class,
            rollNo: studentMeta.rollNo,
            section: studentMeta.section,
          };
        }
      }

      // Generate JWT Token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType,
          ...studentMetaData, // Append student meta data if available
        },
        process.env.JWT_SECRET, // Use a secure environment variable
        { expiresIn: '24h' } // Token expires in 24 hours
      );

      return res.json({
        token: token, // Send the JWT token to the frontend
        success: true,
        message: 'Login successful',
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }
  } catch (e) {
    return res.status(500).send({ success: false, error: e.message });
  }
};

// Signup user
//http://localhost:5000/api/user/register
exports.signup = async function (req, res) {
  //signup as an admin
  let body = req.body;
  try {
    let hash = await bcrypt.hash(body.password, 10);
    await User.create({
      name: body.name,
      email: body.email,
      password: hash,
      userType: body.userType,
      visibility: 1,
    })
      .then((user) => {
        return res.send({
          userId: user.id, //this id will be in frontend
        });
      })
      .catch((err) => {
        return res.json('Something error there ' + err);
      });
    //exports.authenticate(req, res);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

exports.user_meta_data = async function (req, res) {
  // let body = req.body;
  // try {
  //   await UserMeta.create({
  //     employee_id: `00${body.userId}`,
  //     designation: body.designation,
  //     userId: body.userId,
  //     first_nm: body.fName,
  //     middle_nm: body.mName,
  //     last_nm: body.lName,
  //     visibility: 1,
  //   })
  //     .then((user) => {
  //       res.status(200).json('User has created successfully');
  //     })
  //     .catch((err) => {
  //       return res.status(500).json('Something error there ' + err);
  //     });
  //   //exports.authenticate(req, res);
  // } catch (e) {
  //   return res.status(400).send({ error: e.message });
  // }
};

//get user by type ID
// Get users by userType ID
exports.getUserByType = async (req, res) => {
  try {
    const userTypeId = req.params.userTypeId;

    // Fetch users and include related data from TeacherStSubjectAssociation
    const users = await User.findAll({
      where: {
        userType: userTypeId,
        visibility: 1, // Only fetch visible users
      },
      order: [['createdAt', 'DESC']], // Sort users by creation date in descending order
      include: [
        {
          model: TeacherStSubjectAssociation,
          as: 'subjectAssociations', // Alias for the association
          where: {
            stId: 2, // Only fetch associations where stId = 2
          },
          required: false, // Allow users without associations to be included
        },
      ],
    });

    if (!users.length) {
      return res
        .status(404)
        .json({ message: 'No users found for the given type ID' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by type ID:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};
