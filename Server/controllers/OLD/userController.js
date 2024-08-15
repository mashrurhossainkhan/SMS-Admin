//  Author: Mohammad Jihad Hossain
//  Create Date: 24/03/2021
//  Modify Date: 31/03/2021
//  Description: User controller file for rest api project for FamousAuto

// Library import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwtConfig');
const availableUserRoles = require('../config/userRolesConfig');

// Import file
const secret = require('../../config/secret');

// Model import
const models = require('../../models');
const User = models.user;
const UserMeta = models.user_meta;

// Signup user
//http://localhost:5000/api/user/register
exports.signup = async function (req, res) {
  let body = req.body;

  try {
    let hash = await bcrypt.hash(body.password, 10);
    const today = new Date();
    const future = new Date(today);
    future.setDate(future.getDate() + 30);
    await User.create({
      userName: body.userName,
      company_id: body.companyId, //company id will come from company name
      email: body.email,
      password: hash,
      visibility: 1,
      trail: 1,
      trail_start_date: today,
      trail_end_date: future,
    })
      .then((user) => {
        return res.send({
          userId: user.id, //this id will be in frontend
        });
      })
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
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
