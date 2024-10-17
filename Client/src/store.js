import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userForgetPasswordReducer,
  userLoginReducer,
  userNewPasswordReducer,
  userRegisterReducer,
  newEmployeeReducer,
  newEmployeeMetaReducer,
  employeeByCompanyIDReducer,
  employeeRemoveReducer,
} from './reducers/userReducers';
import { AllNoticeReducer, newNoticeReducer } from './reducers/noticeReducer';

const reducer = combineReducers({
  userVerificationCode: userForgetPasswordReducer,
  userNewPassword: userNewPasswordReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  newEmployee: newEmployeeReducer,
  newEmplyeeMeta: newEmployeeMetaReducer,
  employeeByCompanyID: employeeByCompanyIDReducer,
  employeeRemove: employeeRemoveReducer,
  newNotice: newNoticeReducer,
  AllNotice: AllNoticeReducer,
});

const userInfoFromStorage = localStorage.getItem(
  '3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK'
)
  ? JSON.parse(localStorage.getItem('3tyscBeRLqeTBTacRzEUXDAmKmGV6qMK'))
  : null;

const initialState = {
  userLogin: { userInfoGS: userInfoFromStorage },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
