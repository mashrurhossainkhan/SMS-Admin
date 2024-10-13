import axios from 'axios';
import {
  NEW_NOTICE_REQUEST,
  NEW_NOTICE_SUCCESS,
  NEW_NOTICE_FAIL,
} from '../constants/noticeConstants';
import { API } from './api';

export const addNotice =
  (date, noticeTitle, noticeDetails, noticeFile) => async (dispatch) => {
    try {
      dispatch({ type: NEW_NOTICE_REQUEST });

      // Create a FormData object to handle the file and other form data
      const formData = new FormData();
      formData.append('date', date);
      formData.append('noticeTitle', noticeTitle);
      formData.append('noticeDetails', noticeDetails);

      // Check if a file is provided and append it to the FormData
      if (noticeFile) {
        formData.append('image', noticeFile); // Append the file to the FormData
      }

      // Set the headers to send form data (multipart/form-data)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // Make a POST request to your backend
      const { data } = await axios.post(
        `${API}/api/create/notice`,
        formData,
        config
      );

      dispatch({
        type: NEW_NOTICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_NOTICE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
