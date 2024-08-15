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
  USER_FORGETPASSWORD_FAIL,
  USER_FORGETPASSWORD_REQUEST,
  USER_FORGETPASSWORD_SUCCESS,
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
} from "../constants/userConstants";

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
