// Library imports
var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwtStrategry = require("../strategies/jwt");
passport.use(jwtStrategry);

// Import all controller
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const designationController = require("../controllers/designationController");
const CompanyController = require("../controllers/companyController");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );

  next();
});

// Entery point of the Application
router.get("/", (req, res) => res.send("Hello World"));
// =======================================
// ALL the role API

  router.post(
    "/api/user/register",
  userController.signup
  );

  router.post(
    "/api/user/user_meta_data",
  userController.user_meta_data
  );

  router.post(
    "/api/add/designation",
    designationController.addDesignation
  );

  router.get(
      "/api/getbycompanyid/designation",
      designationController.getDesignationsByCompanyID
  );

  router.delete(
    "/api/deletebyid/designation/:id",
    designationController.deleteDesignationsByID
  );

  //Company starts
  router.post(
    "/api/add/comapnydata",
    CompanyController.addCompanyInfo,
  
  );

  router.post(
    "/api/add/comapnymetadata",
    CompanyController.addCompanyMetaInfo
  );
  //Company Ends

  router.post("/api/user/login", authController.signin);

  router.use(function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
