//  Author: Mohammad Jihad Hossain
//  Create Date: 31/03/2021
//  Modify Date: 31/03/2021
//  Description: Customer controller file for rest api project for FamousAuto

// Model import
const models = require('../../models');
const Role = models.role;
const Permission = models.permission;
const Customer = models.customer;

// Add new role
exports.addCustomer = async function (req, res) {
  let body = req.body;

  try {
    await Customer.create({
      name: body.name,
      phoneNo: body.phoneNo,
      email: body.email,
      deposite: body.deposite,
      address: body.address,
      status: body.address,
    })
      .then((customer) => {
        //console.log("user created");
        res.status(200).json('Customer has created successfully');
      })
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
      });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

// Get all the customers
exports.getAllCustomer = async function (req, res) {
  try {
    await Customer.findAll()
      .then((customers) => {
        res.status(200).json(customers);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.editCustomer = async function (req, res) {
  let customerId = req.params.id;

  let body = req.body;

  try {
    await Customer.create({
      name: body.name,
      phoneNo: body.phoneNo,
      email: body.email,
      deposite: body.deposite,
      address: body.address,
      status: body.address,
    })
      .then((customer) => {
        //console.log("user created");
        res.status(200).json('Customer has created successfully');
      })
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
      });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};
