import {
  NEW_NOTICE_FAIL,
  NEW_NOTICE_REQUEST,
  NEW_NOTICE_SUCCESS,
} from '../constants/noticeConstants';

export const newNoticeReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_NOTICE_REQUEST:
      return { loading: true };
    case NEW_NOTICE_SUCCESS:
      return {
        loading: false,
        newNoticeInfo: action.payload,
      };
    case NEW_NOTICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
