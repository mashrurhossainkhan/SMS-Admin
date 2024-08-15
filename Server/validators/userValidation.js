//  Author: Mohammad Jihad Hossain
//  Create Date: 24/03/2021
//  Modify Date: 24/03/2021
//  Description: User validation file for rest api project for FamousAuto

// Import file
const { check } = require("express-validator");

module.exports = {
  // Signup validation
  signUpValidator: [
    
    check("roleId").trim().not().isEmpty().withMessage("Role is required!"),

    check("userName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username is required!")
      .isString()
      .withMessage("Username must be string!")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be 3 to 20 characters"),

    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Please provide a valid email address"),

    check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 4, max: 30 })
      .withMessage("Password must be between 4 to 30 characters"),

    check("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Firstname is required!")
      .isString()
      .withMessage("Firstname must be string!")
      .isLength({ min: 3, max: 20 })
      .withMessage("Firstname must be 3 to 20 characters"),

    check("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Lastname is required!")
      .isString()
      .withMessage("Lastname must be string!")
      .isLength({ min: 3, max: 20 })
      .withMessage("Lastname must be 3 to 20 characters"),

    check("phoneNo")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Phone number is required!")
      .isMobilePhone()
      .withMessage("Please provide a valid phone number address"),

    check("address")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Address is required!")
      .isString()
      .withMessage("Address must be string!")
      .isLength({ min: 3, max: 100 })
      .withMessage("Address must be between 3 to 100 characters"),
  ],

  // Signin validation
  signInValidator: [
    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Please provide a valid email address"),

    check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is required!"),
  ],
};
