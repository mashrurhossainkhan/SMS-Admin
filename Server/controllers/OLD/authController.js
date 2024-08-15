//  Author: Mohammad Jihad Hossain
//  Create Date: 14/02/2021
//  Modify Date: 14/02/2021
//  Description: Auth controller file for rest api project for E-Commerce

// Library import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// File import
const secret = require('../../config/secret');

// Model import
const models = require('../../models');
const User = models.user;
const Role = models.Role;

// Login user
exports.signin = async (req, res) => {
  await User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      // Token generation
      let token = jwt.sign({ id: user.id, user: user }, secret.secretKey, {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      });

      // 86400, // 24 hours

      res.status(200).send({
        id: user.id,
        email: user.email,
        token: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, secret.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    // set userId with req
    req.userId = decoded.id;

    // Set user
    req.user = decoded.user;

    next();
  });
};

// Get current user role and permission
exports.getUserRolePermission = async (req, res, next) => {
  // Authorities and role for logged user
  let authorities = [];
  // Find role and permission
  Role.findOne({
    where: {
      id: req.user.roleId,
    },
  }).then((role) => {
    // set role
    req.role = role.name;
    console.log(req.role);
    // find permission
    role.getPermissions().then((permissions) => {
      for (let i = 0; i < permissions.length; i++) {
        //console.log("ROles: " +roles[i] );
        authorities.push(permissions[i].name);
      }
      console.log(authorities);
      // set permission
      req.permissions = authorities;
    });
  });

  next();
};

exports.isAdmin = (req, res, next) => {
  User.findOne({ where: (id = req.userId) }).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Admin role required',
      });
      return;
    });
  });
};

exports.isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Moderator Role!',
      });
    });
  });
};

exports.isEmployee = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'employee') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Employee Role!',
      });
    });
  });
};

exports.isEmployeeOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'employee') {
          next();
          return;
        }

        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Moderator or Admin Role!',
      });
    });
  });
};
