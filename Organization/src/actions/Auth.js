import {
  VERIFY_TOKEN,
  LOGIN_START,
  LOGOUT,
  SETUSERNAME,
  RESETPW_SEND_EMAIL,
  RESET_SEND_EMAIL_STATE,
  RESETPW_START,
} from '../common/ActionTypes';


export const verifyToken = (token) => ({
  type: VERIFY_TOKEN,
  payload: token,
});

export const Login = (data) => ({
  type: LOGIN_START,
  payload: data,
});

export const Logout = () => ({
  type: LOGOUT,
})

export const setUserName = (name) => ({
  type: SETUSERNAME,
  name: name,
})

export const sendEmail = (email, callback) => ({
  type: RESETPW_SEND_EMAIL,
  payload: email,
  call: callback, 
})

export const RESETsendemailstate = () => ({
  type: RESET_SEND_EMAIL_STATE,
})

export const resetPW = (data, callback) => ({
  type: RESETPW_START,
  payload: data,
  call: callback, 
})
