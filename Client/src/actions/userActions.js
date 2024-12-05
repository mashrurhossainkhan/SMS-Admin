import axios from 'axios';
import {
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
  NEW_EMPLOYEE_REQUEST,
  NEW_EMPLOYEE_SUCCESS,
  NEW_EMPLOYEE_FAIL,
  NEW_EMPLOYEE_META_REQUEST,
  NEW_EMPLOYEE_META_SUCCESS,
  NEW_EMPLOYEE_META_FAIL,
  ALL_EMPLOYEE_BY_COMPANYID_REQUEST,
  ALL_EMPLOYEE_BY_COMPANYID_SUCCESS,
  ALL_EMPLOYEE_BY_COMPANYID_FAIL,
  EMPLOYEE_REMOVE_REQUEST,
  EMPLOYEE_REMOVE_SUCCESS,
  EMPLOYEE_REMOVE_FAIL,
  STUDENT_ATTENDANCE_GET_REQUEST,
  STUDENT_ATTENDANCE_GET_SUCCESS,
  STUDENT_ATTENDANCE_GET_FAIL,
  STUDENT_ATTENDANCE_POST_REQUEST,
  STUDENT_ATTENDANCE_POST_SUCCESS,
  STUDENT_ATTENDANCE_POST_FAIL,
  USER_GET_BY_USERTYPE_GET_REQUEST,
  USER_GET_BY_USERTYPE_GET_SUCCESS,
  USER_GET_BY_USERTYPE_GET_FAIL,
} from '../constants/userConstants';
import { Typography } from '@material-ui/core';
import { API } from './api';

/*
export const detailsUserByCompanyId = (companyId) => {
  return (dispatch, getState) => {
    // Dispatch an action to indicate that data is being fetched
    dispatch({ type: ALL_EMPLOYEE_BY_COMPANYID_REQUEST, payload: companyId });

    // Call the first API and get the user data
    axios.get(`${API}/api/user/getuser/${companyId}`)
      .then(response => {
        const user = response.data;
        
        console.log("user.id: " + user);
        // Call the second API and get the user's Meta
        axios.get(`/api/user/getuserMeta/${user.id}`)
          .then(response => {
            const userMeta = response.data;

            // Dispatch an action to indicate that data has been received
            dispatch({
              type: ALL_EMPLOYEE_BY_COMPANYID_SUCCESS,
              payload: { user, userMeta }
            });
          })
          .catch(error => {
            dispatch({ type: ALL_EMPLOYEE_BY_COMPANYID_FAIL, payload: error.message });
          });
      })
      .catch(error => {
        dispatch({ type: ALL_EMPLOYEE_BY_COMPANYID_FAIL, payload: error.message });
      });
  };
};
*/

export const detailsUserByCompanyId = (companyId) => async (dispatch) => {
  dispatch({
    type: ALL_EMPLOYEE_BY_COMPANYID_REQUEST,
    payload: companyId,
  });
  try {
    const { data } = await axios.get(`${API}/api/user/getuser/${companyId}`);

    if (data) {
      async function getData() {
        data.map(async (item) => {
          const response = await axios.get(
            `${API}/api/user/getuserMeta/${item.id}`
          );
          return response.data;
        });
      }
      dispatch({ type: ALL_EMPLOYEE_BY_COMPANYID_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: ALL_EMPLOYEE_BY_COMPANYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (email, password, props) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      API + '/api/user/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem(
      '3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK',
      JSON.stringify(data)
    );

    if (JSON.parse(localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK'))) {
      //will change later
      /*
            const userSignin = useSelector((state) => state.userSignin);
            const { loading, error, userInfoGS} = userSignin;
        */
      window.location.href = '/dashboard';
    } else {
      alert('Password or email is not correct!');
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK');
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (name, email, password, userType) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        API + '/api/user/register',
        { name, email, password, userType },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem(
        '3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK',
        JSON.stringify(data)
      );
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const newPassword = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_NEW_PASSWORD_REQUEST,
    });

    const { data } = await axios.put(
      API + '/api/user/newpassword/' + email + '/' + password
    );

    dispatch({
      type: USER_NEW_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_NEW_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGETPASSWORD_REQUEST,
    });

    const { data } = await axios.get(API + '/api/user/forgetpassword/' + email);

    dispatch({
      type: USER_FORGETPASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FORGETPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addEmployee =
  (name, employeeID, companyId, email, phn_no, designation, password) =>
  async (dispatch) => {
    try {
      dispatch({
        type: NEW_EMPLOYEE_REQUEST,
      });

      const { data } = await axios.post(API + '/api/user/new/employee', {
        name,
        companyId,
        email,
        phn_no,
        password,
      });

      dispatch({
        type: NEW_EMPLOYEE_SUCCESS,
        payload: data,
      });

      await dispatch(
        addEmployeeMeta(data.userId, employeeID, designation, phn_no)
      );
    } catch (error) {
      dispatch({
        type: NEW_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addEmployeeMeta =
  (userID, employeeID, designation, phnNo) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_EMPLOYEE_META_REQUEST,
      });
      const { data } = await axios.post(
        API + '/api/user/new/meta/info/employee',
        { userID, employeeID, designation, phnNo }
      );

      dispatch({
        type: NEW_EMPLOYEE_META_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_EMPLOYEE_META_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//employee remove (visibility: 0 from 1)
export const removeEmployee = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_REMOVE_REQUEST,
    });
    console.log(userID);
    const { data } = await axios.put(API + '/api/user/remove/' + userID);

    dispatch({
      type: EMPLOYEE_REMOVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const studentFetchForTeachers = (email) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_ATTENDANCE_GET_REQUEST,
    });

    const { data } = await axios.get(
      API + '/api/st/teachers/subjects/association/all/info/' + email
    );
    console.log(data);
    dispatch({
      type: STUDENT_ATTENDANCE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_ATTENDANCE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const studentAttendanceBulkForTeachers =
  (attendance) => async (dispatch) => {
    try {
      dispatch({
        type: STUDENT_ATTENDANCE_POST_REQUEST,
      });
      const { data } = await axios.post(
        API + '/api/attendance/insert',
        attendance
      );
      console.log(data);
      dispatch({
        type: STUDENT_ATTENDANCE_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_ATTENDANCE_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchUserByUserTypeActions = (userType) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GET_BY_USERTYPE_GET_REQUEST,
    });
    const { data } = await axios.post(API + 'api/users/type/' + userType);
    console.log(data);
    dispatch({
      type: USER_GET_BY_USERTYPE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_BY_USERTYPE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
