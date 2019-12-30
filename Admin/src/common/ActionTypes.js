const SERVERIP = 'http://localhost:5000'; //18.217.199.12
//Auth const
export const VERIFY_TOKEN = 'verify_token';
export const VERIFY_TOKEN_END = 'verify_token_end';
export const VERIFY_TOKEN_SUCCESS = 'verify_token_success';
export const VERIFY_TOKEN_FAILED = 'verify_token_failed';
export const VERIFY_TOKEN_URL = SERVERIP + '/api/administrators/token-verify';

export const LOGIN_START = 'login_start';
export const LOGIN_URL = SERVERIP + '/api/administrators/login';
export const LOGIN_END = 'login_end';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAILED = 'login_failed';
export const INIT_URL = '/overview';
export const LOGOUT = 'logout';
export const LOGOUT_SUCCESS = 'logout_success';
export const LOGOUT_FAILED = 'logout_failed';
export const LOGOUT_SEVER_URL = SERVERIP + '/api/administrators/logout';
export const GOTO_LOGIN_URL = '/login';
export const SETUSERNAME = 'setusername';

//GET data
export const GET_DATA = 'get_data';
export const GET_DATA_URL_ADMIN = SERVERIP + '/api/administrators/get-all';
export const GET_DATA_URL_ORGAN = SERVERIP + '/api/organizations/get-all';
export const GET_DATA_URL_CANDI = SERVERIP + '/api/candidates/get-all';
export const GET_DATA_URL_TRAIN = SERVERIP + '/api/trainings/get-all';
export const GET_DATA_START = 'get_start';
export const GET_DATA_END = 'get_end';
export const GET_DATA_SUCCESS = 'get_data_success'; 
export const GET_DATA_FAILED = 'get_failed';

// Normal cons
export const ADD_OPEN = 'ADD_OPEN';
export const ADD_CLOSE = 'ADD_CLOSE';

// Organization Add
export const ADD_ORGAN = 'add_organ';
export const ADD_ORGAN_START = 'add_organ_start';
export const ADD_ORGAN_END = 'add_organ_end';
export const ADD_ORGAN_URL = SERVERIP + '/api/organizations/create';
export const ADD_ORGAN_FAILED = 'add_organ_failed';
export const ADD_ORGAN_SUCCESS = 'add_organ_success';

// Organization Edit
export const EDIT_ORGAN = 'edit_organ';
export const EDIT_ORGAN_START = 'edit_organ_start';
export const EDIT_ORGAN_END = 'edit_organ_end';
export const EDIT_ORGAN_URL = SERVERIP + '/api/organizations/update';
export const EDIT_ORGAN_FAILED = 'edit_organ_failed';
export const EDIT_ORGAN_SUCCESS = 'edit_organ_success';

// Organization Delete
export const DELETE_ORGAN = 'delete_organ';
export const DELETE_ORGAN_START = 'delete_organ_start';
export const DELETE_ORGAN_END = 'delete_organ_end';
export const DELETE_ORGAN_URL = SERVERIP + '/api/organizations/delete';
export const DELETE_ORGAN_FAILED = 'delete_organ_failed';
export const DELETE_ORGAN_SUCCESS = 'delete_organ_success';

// Adminstrator Add
export const ADD_ADMIN = 'add_admin';
export const ADD_ADMIN_START = 'add_admin_start';
export const ADD_ADMIN_END = 'add_admin_end';
export const ADD_ADMIN_URL = SERVERIP + '/api/administrators/create';
export const ADD_ADMIN_FAILED = 'add_admin_failed';
export const ADD_ADMIN_SUCCESS = 'add_admin_success';

// Adminstrator Edit
export const EDIT_ADMIN = 'eidt_admin';
export const EDIT_ADMIN_START = 'eidt_admin_start';
export const EDIT_ADMIN_END = 'eidt_admin_end';
export const EDIT_ADMIN_URL = SERVERIP + '/api/administrators/update';
export const EDIT_ADMIN_FAILED = 'eidt_admin_failed';
export const EDIT_ADMIN_SUCCESS = 'eidt_admin_success';

// Adminstrator Delete
export const DELETE_ADMIN = 'delete_admin';
export const DELETE_ADMIN_START = 'delete_admin_start';
export const DELETE_ADMIN_END = 'delete_admin_end';
export const DELETE_ADMIN_URL = SERVERIP + '/api/administrators/delete';
export const DELETE_ADMIN_FAILED = 'delete_admin_failed';
export const DELETE_ADMIN_SUCCESS = 'delete_admin_success';




