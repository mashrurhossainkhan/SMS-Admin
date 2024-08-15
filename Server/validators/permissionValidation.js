//  Author: Mohammad Jihad Hossain
//  Create Date: 24/03/2021
//  Modify Date: 24/03/2021
//  Description: Permission validation file for rest api project for FamousAuto

// Import file
const { check } = require("express-validator");

module.exports = {
    // Add permission validation
  addPermissionValidator: [
    check("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Permission name is required!")
      .isString()
      .withMessage("Permission name must be String")
      .isLength({ min: 3, max: 20 })
      .withMessage("Permission name must be between 3 to 20"),
  ]
};