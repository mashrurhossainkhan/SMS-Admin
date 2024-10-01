// Library imports
var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwtStrategry = require('../strategies/jwt');
passport.use(jwtStrategry);

// Import all controller
const noticeController = require('../controllers/noticeBoardController');
const studentController = require('../controllers/studentController');
const teacherController = require('../controllers/teacherController');
const userController = require('../controllers/userController');

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );

  next();
});

/* 
Admin registration API Starts
*/
router.post('/api/user/register', userController.signup);
/*
Admin registration API ends
*/

//notice APIs start
router.post('/api/create/notice', noticeController.addNotice);
router.get('/api/all/notice', noticeController.getAllNotices);
router.get('/api/notice/:id', noticeController.getNoticesByID);
router.put('/api/notice/update/:id', noticeController.updateNoticesByID);
router.put(
  '/api/notice/update/visibility/false/:id',
  noticeController.updateNoticesVisibilityFalseByID
);
router.put(
  '/api/notice/update/visibility/true/:id',
  noticeController.updateNoticesVisibilityTrueByID
);
//notice APIs end

//Student APIs start
router.post('/api/signup/student', studentController.studentSignup);
router.get('/api/signin/student', studentController.studentSignin);
//Student APIs end

//techer APIs start
router.post('/api/signup/teacher', teacherController.insertTeacherInfo);
//router.get('/api/signin/student', studentController.studentSignin);
//techer APIs end

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
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
