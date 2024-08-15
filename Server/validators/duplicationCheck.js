//  Author: Mohammad Jihad Hossain
//  Create Date: 24/03/2021
//  Modify Date: 24/03/2021
//  Description: Duplicate check file for rest api project for FamousAuto

// Library import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");
const availableUserRoles = require("../config/userRolesConfig");

// Model import
const models = require("../models");
const User = models.user;
const Role = models.Role;
const Permission = models.Permission;


// Check duplicate email for user signup
exports.checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).json("Failed! Email is already in use!");
    }
    next();
  });
};

// Check duplicate Username for user signup
exports.checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    where: {
      userName: req.body.userName,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).json("Failed! Username is already in use!");
    }
    next();
  });
};

// Check role exist in DB
exports.checkRoleExist = async (req, res, next) => {
  if (req.body.role) {
    const existRole = await Role.findOne({
      where: {
        name: req.body.role,
      },
    });
    if (!existRole) {
      return res
        .status(400)
        .json("Failed! Role does not exist = " + req.body.roles);
    }
  }
  next();
};

// Check duplicate permission
exports.checkDuplicatePermission = (req, res, next) => {
  Permission.findOne({
    where: {
      name: req.body.name,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).json("Failed! this permission is already in use!");
    }
    next();
  });
};


// Check duplicate role
exports.checkDuplicateRole = (req, res, next) => {
  Role.findOne({
    where: {
      name: req.body.name,
    },
  }).then((role) => {
    if (role) {
      return res.status(400).json("Failed! this role is already in use!");
    }
    next();
  });
};