const bcrypt = require('bcrypt');
// Model import
const models = require('../models');
const User = models.user;

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
  let body = req.body;
  try {
    await UserMeta.create({
      employee_id: `00${body.userId}`,
      designation: body.designation,
      userId: body.userId,
      first_nm: body.fName,
      middle_nm: body.mName,
      last_nm: body.lName,
      visibility: 1,
    })
      .then((user) => {
        res.status(200).json('User has created successfully');
      })
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
      });
    //exports.authenticate(req, res);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

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
      res.json('Email is not correct!');
    }

    console.log('user information ==> ' + JSON.stringify(user));

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (isMatch) {
      res.send({
        email: body.email,
        success: true,
        message: 'Login successful',
      });
    } else {
      res.send({ success: false, message: 'Invalid credentials' });
    }

    //exports.authenticate(req, res);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

//get user by type ID
// Get users by userType ID
exports.getUserByType = async (req, res) => {
  try {
    const userTypeId = req.params.userTypeId;

    const users = await User.findAll({
      where: {
        userType: userTypeId,
        visibility: 1, // Assuming only visible users should be fetched
      },
      order: [['createdAt', 'DESC']], // Sort users by creation date in descending order
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
