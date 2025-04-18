import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const ForgetPassword = React.lazy(() =>
  import('./views/pages/forgetPasword/forgetPasword')
);
const NewPasswordScreen = React.lazy(() =>
  import('./views/pages/forgetPasword/newPasswordScreen')
);
const EmailVerification = React.lazy(() =>
  import('./views/pages/forgetPasword/enterVerificationCode')
);
const NoticeBoardCreate = React.lazy(() =>
  import('./views/pages/notice_board/Notice_board')
);

const StudentCreate = React.lazy(() =>
  import('./views/pages/Student/CreateStudent')
);

const TeacherCreate = React.lazy(() =>
  import('./views/pages/Teacherts/CreateTeacherts')
);

const AllNotices = React.lazy(() =>
  import('./views/pages/notice_board/GetAllNotices')
);

const AllStudentsByClassSection = React.lazy(() =>
  import('./views/Attendance/StudentList')
);


const DatesForAttendanceHistory = React.lazy(() =>
  import('./views/Attendance/HistoryCards')
);


const AddResultType = React.lazy(() =>
  import('./views/report/AddResultType')
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />

            <Route
              path="/attendance/students/:classNumber/:section"
              name="studentList"
              render={(props) => <AllStudentsByClassSection {...props} />}
            />

            <Route
              path="/notice_board/create"
              name="Notice Board Create"
              render={(props) => <NoticeBoardCreate {...props} />}
            />


          <Route
              path="/add/result/type"
              name="Add Result Type"
              render={(props) => <AddResultType {...props} />}
            />

            <Route
              path="/attendance/history/dates"
              name="Attendance history date"
              render={(props) => <DatesForAttendanceHistory {...props} />}
            />

            <Route
              path="/notice_board/manage/all"
              name="All Notices"
              render={(props) => <AllNotices {...props} />}
            />

            <Route
              path="/student/create"
              name="Student Create"
              render={(props) => <StudentCreate {...props} />}
            />

            <Route
              path="/teacher/create"
              name="Teacher Create"
              render={(props) => <TeacherCreate {...props} />}
            />

            <Route
              exact
              path="/forgetpassword"
              name="Forget Password Page"
              render={(props) => <ForgetPassword {...props} />}
            />
            <Route
              exact
              path="/emailverificationcode"
              name="Forget Password Page"
              render={(props) => <EmailVerification {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />

            <Route
              exact
              path="/newpassword"
              name="Register Page"
              render={(props) => <NewPasswordScreen {...props} />}
            />

            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
