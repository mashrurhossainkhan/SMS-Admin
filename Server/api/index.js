// Library imports
var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwtStrategry = require('../strategies/jwt');
const authMiddleware = require('../config/authMiddleWare');
passport.use(jwtStrategry);

// Import all controller
const noticeController = require('../controllers/noticeBoardController');
const studentController = require('../controllers/studentController');
const teacherController = require('../controllers/teacherController');
const teacherMetaController = require('../controllers/teacherMetaController');
const userController = require('../controllers/userController');
const subjectController = require('../controllers/subjectController');
const attendanceController = require('../controllers/attendanceController');
const AssociationController = require('../controllers/associationController');
const paymentController = require('../controllers/paymentController');
const resultController = require('../controllers/resultController');
const routineController = require('../controllers/classRoutineController');
const speechController = require('../controllers/speechController');
const dashboardController = require('../controllers/dashboardController');
const permissionController = require('../controllers/permissionControllers');
const feeController = require('../controllers/feesController');

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );

  next();
});

//fees controller
router.post('/api/fees', feeController.createFee);
router.get('/api/fees', feeController.getFees);
router.get('/api/fees/:id', feeController.getFeeById);
router.put('/api/fees/:id', feeController.updateFee);
router.delete('/api/fees/:id', feeController.deleteFee);
router.get('/fees/class/:className', feeController.getFeeByClass);
//fees controller

//permission controllers
router.post('/permissions/assign', permissionController.assignPermission); // Assign permission
router.get('/permissions/all', permissionController.getAllAssignedPermissions); // Get all assigned permissions
router.get(
  '/permissions/user/:userId',
  permissionController.getPermissionsByUserId
); // Get permissions by user
router.put('/permissions/:id', permissionController.updateAssignedPermission); // Update permission
router.delete(
  '/api/user-permissions/:userId/:permissionTypeId',
  permissionController.removeAssignedPermission
); // Remove permission

router.post('/permissions', permissionController.createPermission);
router.get('/permissions', permissionController.getAllPermissions);
router.get(
  '/api/users/exclude-students',
  permissionController.getUsersExceptStudents
);
router.get('/permissions/:id', permissionController.getPermissionById);
router.put('/permissions/:id', permissionController.updatePermission); //
router.delete('/permissions/:id', permissionController.deletePermission);
//permission controllers
router.get('/api/dashboard', dashboardController.getDashboardSummary);
//speech API start
router.post('/speeches', speechController.createSpeech);
router.get('/speeches', speechController.getAllSpeeches);
router.get('/speeches/:id', speechController.getSpeechById);
router.put('/speeches/:id', speechController.updateSpeech);
router.delete('/speeches/:id', speechController.deleteSpeech);
router.patch('/speeches/restore/:id', speechController.restoreSpeech);
//speech API endf

//Routine Controllers starts
router.post('/api/create/routine', routineController.createClassRoutine);
router.get('/api/all/routine', routineController.getAllClassRoutines);
router.get('/api/get/:id', routineController.getClassRoutineById);
router.put('/api/get/:id', routineController.updateClassRoutineById);
router.delete('/api/delete/:id', routineController.deleteClassRoutineById);
//Routine controllers ends

//result constrollers
router.get(
  '/api/get/result/associate/:associationId',
  resultController.getResultsByAssociationId
);
router.get(
  '/api/get/result/teacher/:teacherId',
  resultController.getResultsByTeacherId
);
router.get(
  '/api/get/result/student/:stId',
  resultController.getResultsByStudentId
);
router.get('/api/get/all/result/types', resultController.getResultTypes);
router.post('/api/add/result/type', resultController.createResultType);
router.delete('/api/delete/result/type/:id', resultController.deleteResultType);
router.post('/api/add/result', resultController.createResult);
router.put('/api/update/result/:id', resultController.updateResult);

// Add this to your router
router.get(
  '/api/result/check/:stId/:resultType/:subjectid',
  resultController.checkExistingResult
);

// router.put('/api/update/result/type/:id', resultController.updateResultType);

router.delete('/api/delete/result/:id', resultController.deleteResult);

router.get(
  '/api/result/student/list/:classNumber/:section',
  attendanceController.getRollNumbersByClassAndSection
);
//result controllers

//paymentController
router.get('/api/payments/all/students', paymentController.getStudentAmounts);
router.get('/api/payments/all/credit', paymentController.getAllCredits);
router.get('/api/payments/all/debit', paymentController.getAllDebits);
router.post('/api/payments/add/credit', paymentController.addCredit);
router.get(
  '/api/payments/history/:userId',
  paymentController.getCreditsByUserId
);
router.get(
  '/api/payments/history/debit/:userId',
  paymentController.getDebitsByUserId
);
router.delete('/api/debit/:id', paymentController.deleteDebitById);
router.delete('/api/credit/:id', paymentController.deleteCreditsById_1);
router.post('/api/payments/add/debit', paymentController.addDedit);
//payment controllers

//Association Controller Starts
router.post(
  '/api/teacher-subject-association',
  AssociationController.insertAssociationRecords
);
//Associaition Controller ends

/* 
Admin registration API Starts
*/
router.post('/api/user/register', userController.signup);
router.post('/api/user/login', userController.login);
router.get('/api/users/type/:userTypeId', userController.getUserByType);
/*
Admin registration API ends 
*/

//attandance controller start
// router.post(
//   '/api/attendance/insert',
//   attendanceController.insertAttendanceRecords
// );
//getRollNumbersByClassAndSection
router.get(
  '/api/get/all/class/attendace',
  attendanceController.getAllUniqueClassesOrdered
);
router.get(
  '/api/get/all/section/by/class/:classNumber',
  attendanceController.getSectionsByClass
);
router.get(
  '/api/attendace/:classNumber/:section',
  attendanceController.getRollNumbersByClassAndSection
);
router.post(
  '/mark-or-update-attendance',
  attendanceController.markOrUpdateAttendance
);
router.get(
  '/api/get/all/history/date',
  attendanceController.getAllAttendanceDates
);
router.get(
  '/api/get/class-sections/:date',
  attendanceController.getClassSectionsAndStudentsByDate
);
//attance controller end

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
router.get('/api/student/all', studentController.getAllStudents);
router.put('/api/student/:id', studentController.updateStudentById);
router.delete('/api/student/:id', studentController.deleteStudentById);
router.post('/api/student/meta/create', studentController.createStudentMeta);
router.get(
  '/api/student/meta/get/:userid',
  studentController.getStudentMetaById
);
router.put(
  '/api/student/meta/:userid',
  studentController.updateStudentMetaById
);
//Student APIs end

//techer APIs start
router.post('/api/signup/teacher', teacherController.insertTeacherInfo);
router.post('/api/create/meta', teacherMetaController.createTeacherMeta);
router.get('/api/teacher/all', teacherController.getAllTeachers);
router.get('/api/get/:userid', teacherMetaController.getTeacherMetaById);
router.put('/api/update/:userid', teacherMetaController.updateTeacherMetaById);
router.delete('/api/teacher/:id', studentController.deleteStudentById);
//router.get('/api/signin/student', studentController.studentSignin);
//techer APIs end

//subject controllers start
router.get('/api/subjects/all/info', subjectController.getAllSubjectInfo);
router.post('/api/subjects/create', subjectController.createSubject);
router.get('/api/subjects/get', subjectController.getAllSubjects);
router.delete('/api/subjects/delete/:id', subjectController.deleteSubject);
router.post(
  '/api/assign/teacher/student/subject',
  subjectController.addTeacherStSubjectAssociation
);
router.get(
  '/api/st/teachers/subjects/association/all/info/:email',
  subjectController.getAllAssociationsWithUserInfo
);
//subject controllers end

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
