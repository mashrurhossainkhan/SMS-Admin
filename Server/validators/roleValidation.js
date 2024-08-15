//  Author: Mohammad Jihad Hossain
//  Create Date: 24/03/2021
//  Modify Date: 24/03/2021
//  Description: Role validation file for rest api project for FamousAuto

// Import file
const { check } = require("express-validator");

module.exports = {
  // Add role validation
  addRoleValidator: [
    check("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Role name is required!")
      .isString()
      .withMessage("Role name must be String")
      .isLength({ min: 3, max: 20 })
      .withMessage("Role name must be between 3 to 20"),

      check("permissions")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Permission required")
  ],
};
