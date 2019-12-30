import {
  VERIFY_TOKEN,
  LOGIN_START,
  LOGOUT,
  SETUSERNAME,
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
