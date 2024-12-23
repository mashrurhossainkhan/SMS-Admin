import {
  ALL_EMPLOYEE_BY_COMPANYID_FAIL,
  ALL_EMPLOYEE_BY_COMPANYID_REQUEST,
  ALL_EMPLOYEE_BY_COMPANYID_SUCCESS,
  EMPLOYEE_REMOVE_FAIL,
  EMPLOYEE_REMOVE_REQUEST,
  EMPLOYEE_REMOVE_SUCCESS,
  NEW_EMPLOYEE_FAIL,
  NEW_EMPLOYEE_META_FAIL,
  NEW_EMPLOYEE_META_REQUEST,
  NEW_EMPLOYEE_META_SUCCESS,
  NEW_EMPLOYEE_REQUEST,
  NEW_EMPLOYEE_SUCCESS,
  STUDENT_ATTENDANCE_GET_FAIL,
  STUDENT_ATTENDANCE_GET_REQUEST,
  STUDENT_ATTENDANCE_GET_SUCCESS,
  STUDENT_ATTENDANCE_POST_FAIL,
  STUDENT_ATTENDANCE_POST_REQUEST,
  STUDENT_ATTENDANCE_POST_SUCCESS,
  USER_FORGETPASSWORD_FAIL,
  USER_FORGETPASSWORD_REQUEST,
  USER_FORGETPASSWORD_SUCCESS,
  USER_GET_BY_USERTYPE_GET_FAIL,
  USER_GET_BY_USERTYPE_GET_REQUEST,
  USER_GET_BY_USERTYPE_GET_SUCCESS,
  USER_GET_BY_USERTYPEST_GET_FAIL,
  USER_GET_BY_USERTYPEST_GET_REQUEST,
  USER_GET_BY_USERTYPEST_GET_SUCCESS,
  USER_GET_BY_USERTYPETEACHER_GET_FAIL,
  USER_GET_BY_USERTYPETEACHER_GET_REQUEST,
  USER_GET_BY_USERTYPETEACHER_GET_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_NEW_PASSWORD_FAIL,
  USER_NEW_PASSWORD_REQUEST,
  USER_NEW_PASSWORD_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfoGS: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfoFamous: action.payload,
      };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userForgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGETPASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGETPASSWORD_SUCCESS:
      return {
        loading: false,
        userVerificationCode: action.payload,
      };
    case USER_FORGETPASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userNewPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NEW_PASSWORD_REQUEST:
      return { loading: true };
    case USER_NEW_PASSWORD_SUCCESS:
      return {
        loading: false,
        userNewPassInfo: action.payload,
      };
    case USER_NEW_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_EMPLOYEE_REQUEST:
      return { loading: true };
    case NEW_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        newEmployeeInfo: action.payload,
      };
    case NEW_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newEmployeeMetaReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_EMPLOYEE_META_REQUEST:
      return { loading: true };
    case NEW_EMPLOYEE_META_SUCCESS:
      return {
        loading: false,
        newEmployeeMetaInfo: action.payload,
      };
    case NEW_EMPLOYEE_META_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employeeByCompanyIDReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_EMPLOYEE_BY_COMPANYID_REQUEST:
      return { loading: true };
    case ALL_EMPLOYEE_BY_COMPANYID_SUCCESS:
      return {
        loading: false,
        allEmployeeByCompanyID: action.payload,
      };

    case ALL_EMPLOYEE_BY_COMPANYID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employeeRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_REMOVE_REQUEST:
      return { loading: true };
    case EMPLOYEE_REMOVE_SUCCESS:
      return {
        loading: false,
        deletedEmployeeInfp: action.payload,
      };

    case EMPLOYEE_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentInfoForAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_ATTENDANCE_GET_REQUEST:
      return { loading: true };
    case STUDENT_ATTENDANCE_GET_SUCCESS:
      return {
        loading: false,
        allStudentsInfo: action.payload,
      };

    case STUDENT_ATTENDANCE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postStudentForAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_ATTENDANCE_POST_REQUEST:
      return { loading: true };
    case STUDENT_ATTENDANCE_POST_SUCCESS:
      return {
        loading: false,
        postStudentsAttendance: action.payload,
      };

    case STUDENT_ATTENDANCE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentbyUserTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_BY_USERTYPEST_GET_REQUEST:
      return { loading: true };
    case USER_GET_BY_USERTYPEST_GET_SUCCESS:
      return { loading: false, studentsStore: action.payload.data };
    case USER_GET_BY_USERTYPEST_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teacherbyUserTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_BY_USERTYPETEACHER_GET_REQUEST:
      return { loading: true };
    case USER_GET_BY_USERTYPETEACHER_GET_SUCCESS:
      return { loading: false, teachersStore: action.payload.data };
    case USER_GET_BY_USERTYPETEACHER_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
