import {
  ALL_SUBJECTS_GET_FAIL,
  ALL_SUBJECTS_GET_REQUEST,
  ALL_SUBJECTS_GET_SUCCESS,
} from '../constants/subjectConstants';

export const allSubjectsReducer = (state = { subjects: [] }, action) => {
  switch (action.type) {
    case ALL_SUBJECTS_GET_REQUEST:
      return { loading: true, subjects: [] };
    case ALL_SUBJECTS_GET_SUCCESS:
      return { loading: false, subjects: action.payload };
    case ALL_SUBJECTS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
