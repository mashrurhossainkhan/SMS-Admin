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
const Role = models.Role;
const Permission = models.Permission;

// Add new permission
exports.addPermission = async function (req, res) {
  let body = req.body;

  console.log(req.body.name);

  try {
    if (!body.name) {
      throw res.status(400).json('Enter a Permission name you want');
    }

    await Permission.create({
      name: body.name,
    })
      .then((permission) =>
        res.status(201).json(permission.name + ' permission created')
      )
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
      });
  } catch (e) {
    res.status(400).json(e);
  }
};

// Get all the permissions
exports.getAllPermission = async function (req, res) {
  try {
    await Permission.findAll()
      .then((permissions) => {
        res.status(200).json(permissions);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
