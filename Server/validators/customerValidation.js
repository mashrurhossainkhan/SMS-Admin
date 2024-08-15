const { check } = require('express-validator');

module.exports = {
  // Add customer validation
  addCustomerValidator: [
    check('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is required!')
      .isString()
      .withMessage('Name must be string!')
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be 3 to 30 characters'),

    check('phoneNo')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Phone number is required!')
      .isMobilePhone()
      .withMessage('Please provide a valid phone number address'),

    check('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Email is required!')
      .isEmail()
      .withMessage('Please provide a valid email address'),

    check('deposite')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Deposite is required!')
      .isFloat.withMessage('Deposite must be number value'),

    check('address')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Address is required!')
      .isString()
      .withMessage('Address must be string!')
      .isLength({ min: 3, max: 100 })
      .withMessage('Address must be between 3 to 100 characters'),

    check('status').trim().not().isEmpty().withMessage('Status is required!'),
  ],

  // Edit customer validation
  editCustomerValidator: [
    check('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is required!')
      .isString()
      .withMessage('Name must be string!')
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be 3 to 30 characters'),

    check('phoneNo')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Phone number is required!')
      .isMobilePhone()
      .withMessage('Please provide a valid phone number address'),

    check('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Email is required!')
      .isEmail()
      .withMessage('Please provide a valid email address'),

    check('deposite')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Deposite is required!')
      .isFloat.withMessage('Deposite must be number value'),

    check('address')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Address is required!')
      .isString()
      .withMessage('Address must be string!')
      .isLength({ min: 3, max: 100 })
      .withMessage('Address must be between 3 to 100 characters'),

    check('status').trim().not().isEmpty().withMessage('Status is required!'),
  ],
};
