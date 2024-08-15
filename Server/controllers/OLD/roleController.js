//  Author: Mohammad Jihad Hossain
//  Create Date: 24/03/2021
//  Modify Date: 25/03/2021
//  Description: Role controller file for rest api project for FamousAuto

// Model import
const models = require('../../models');
const Role = models.role;
const Permission = models.permission;

// Add new role
exports.addRole = async function (req, res) {
  let body = req.body;

  try {
    if (!body.name) {
      throw res.status(400).json('Enter a role name');
    }

    await Role.create({
      name: body.name,
    })
      .then(async (role) => {
        console.log('Role created');

        console.log(req.body.permissions);

        if (req.body.permissions) {
          let permissions = req.body.permissions;
          console.log('permission length:  ' + permissions.length);
          for (let i = 0; i < permissions.length; i++) {
            Permission.findOne({
              where: {
                id: permissions[i],
              },
            }).then((permission) => {
              console.log('Found permission:  ' + permission);
              role.setPermissions(permission);
            });
          }

          // await Permission.findOne({
          //   where: {
          //     name: req.body.permissions,
          //   },
          // }).then((permission) => {
          //   console.log("Found permission:  " + permission);
          //   role.setPermissions(permission);
          // });

          res.status(200).json('Role and Permissions has created successfully');
        } else {
          res.status(500).json('There is no permisssion selected');
        }
      })
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
      });
  } catch (e) {
    res.status(400).json(e);
  }
};

// Get all thee roles
exports.getAllRoles = async function (req, res) {
  try {
    await Role.findAll()
      .then((roles) => {
        res.status(200).json(roles);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
