import {
  VERIFY_TOKEN,
  VERIFY_TOKEN_END,
  LOGIN_START,
  LOGIN_END,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SETUSERNAME,
  RESETPW_SEND_EMAIL,
  RESETPW_SEND_EMAIL_END,
  RESET_SEND_EMAIL_STATE,
  RESETPW_START,
  RESETPW_END,
} from '../common/ActionTypes';

const INIT_STATE = {
  loginFlag: '',
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  authUser: localStorage.getItem('user_id'),

  loading: false,
  userName: localStorage.getItem('GSOuserName'),
  photo: localStorage.getItem('GSOuserPhoto'),
  token: '',
  errorMessage: '',
  sendemailstate: '',
  resetpwstate: '',
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
        
    case VERIFY_TOKEN: {
      return {
        ...state,
        token: '',
        loading: true,
      }
    }
    case VERIFY_TOKEN_END: {
      return {        
        ...state,
        tokenstate: action.tokenstate,
        token: action.token,
        loading: false,
      }
    }

    case LOGIN_START: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case LOGIN_END: {
      return {        
        ...state,
        loginstate: action.loginstate,
        errorMessage: action.errorMessage,
        email: action.email,
        id: action.id,
        userName: action.name,
        token: action.token,
        loading: false,
      }
    }
    case LOGOUT: {
      return {        
        ...state,
        email: '',
        id: '',
        userName: '',
        token: '',
        logoutstate: '',
        errorMessage: '',
      }
    }
    case LOGOUT_SUCCESS: {
      return {        
        ...state,
        email: '',
        id: '',
        userName: '',
        token: '',
        loginstate: '',
        logoutstate: action.logoutstate,
      }
    }
    case LOGOUT_FAILED: {
      return {        
        ...state,
        email: '',
        id: '',
        userName: '',
        token: '',
        errorMessage: action.errorMessage,
      }
    }
    case SETUSERNAME: {
      return {        
        ...state,
        userName: action.name,
        photo: localStorage.getItem('GSOuserPhoto'),
      }
    }
    case RESETPW_SEND_EMAIL: {
      return {        
        ...state,
        sendEmail: action.payload,
        loading: false,
      }
    }
    case RESETPW_SEND_EMAIL_END: {
      return {        
        ...state,
        loading: true,
        sendemailstate: action.sendemailstate,
      }
    }
    case RESET_SEND_EMAIL_STATE: {
      return {        
        ...state,
        sendemailstate: '',
        resetpwstate: '',
      }
    }
    case RESETPW_START: {
      return {        
        ...state,
        loading: false,
      }
    }
    case RESETPW_END: {
      return {        
        ...state,
        loading: true,
        resetpwstate: action.resetpwstate,
      }
    }
    default:
      return state;
  }
}
