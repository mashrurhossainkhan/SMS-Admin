import axios from 'axios';

import { API } from './api';
import {
  ALL_SUBJECTS_GET_FAIL,
  ALL_SUBJECTS_GET_REQUEST,
  ALL_SUBJECTS_GET_SUCCESS,
} from '../constants/subjectConstants';

export const allSubjectsActions = (compnyId) => async (dispatch) => {
  dispatch({
    type: ALL_SUBJECTS_GET_REQUEST,
  });
  try {
    const { data } = await axios.get(`${API}/api/subjects/all/info`);

    dispatch({ type: ALL_SUBJECTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_SUBJECTS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
