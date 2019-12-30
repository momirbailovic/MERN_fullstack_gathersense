const SERVERIP = 'http://18.217.199.12:5000'; //18.217.199.12
//Auth const
export const VERIFY_TOKEN = 'verify_token';
export const VERIFY_TOKEN_END = 'verify_token_end';
export const VERIFY_TOKEN_SUCCESS = 'verify_token_success';
export const VERIFY_TOKEN_FAILED = 'verify_token_failed';
export const VERIFY_TOKEN_URL = SERVERIP + '/api/organizations/token-verify';

export const LOGIN_START = 'login_start';
export const LOGIN_URL = SERVERIP + '/api/organizations/login';
export const LOGIN_END = 'login_end';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAILED = 'login_failed';
export const INIT_URL = '/overview';
export const LOGOUT = 'logout';
export const LOGOUT_SUCCESS = 'logout_success';
export const LOGOUT_FAILED = 'logout_failed';
export const LOGOUT_SEVER_URL = SERVERIP + '/api/organizations/logout';
export const GOTO_LOGIN_URL = '/login';
export const SETUSERNAME = 'setusername';

export const RESETPW_SEND_EMAIL = 'resetpw_send_email';
export const RESETPW_SEND_EMAIL_END = 'resetpw_send_email_end';
export const RESETPW_SEND_EMAIL_URL = SERVERIP + '/api/organizations/forgot';
export const RESETPW_SEND_EMAIL_SUCCESS = 'resetpw_send_email_success';
export const RESETPW_SEND_EMAIL_FAILED = 'resetpw_send_email_failed';

export const RESET_SEND_EMAIL_STATE = 'reset_send_email_state';

export const RESETPW_START = 'resetpw_start';
export const RESETPW_END = 'resetpw_end';
export const RESETPW_URL = SERVERIP + '/api/organizations/reset';
export const RESETPW_SUCCESS = 'resetpw_success';
export const RESETPW_FAILED = 'resetpw_failed';

//GET data
export const GET_DATA = 'get_data';
export const GET_DATA_URL_ADMIN = SERVERIP + '/api/administrators/get-all';
export const GET_DATA_URL_ORGAN = SERVERIP + '/api/organizations/get-all';
export const GET_DATA_URL_CANDI = SERVERIP + '/api/organizations/get-candidates';
export const GET_DATA_URL_TRAIN = SERVERIP + '/api/organizations/get-trainings';
export const GET_DATA_START = 'get_start';
export const GET_DATA_END = 'get_end';
export const GET_DATA_SUCCESS = 'get_data_success'; 
export const GET_DATA_FAILED = 'get_failed';

// Normal const
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

// Training 
export const SET_TITLE_COLOR = 'set_title_color';
export const SET_TAG_COLOR = 'set_tag_color';
export const ADD_NEW_CANDIDATES = 'add_new_candidates';
export const ADD_NEW_CANDIDATES_END = 'add_new_candidates_END';
export const ADD_NEW_CANDIDATES_SUCCESS = 'add_new_candidates_SUCCESS';
export const ADD_NEW_CANDIDATES_FAILED = 'add_new_candidates_FAILED';
export const ADD_NEW_CANDIDATES_URL = SERVERIP + '/api/candidates/create';

export const SET_CHANGE_CANDIDATES = 'set_change_candidates';
export const SET_NEW_TITLE = 'set_new_title';
export const SET_NEW_DESCRIPTION = 'set_new_description';

export const ADD_NEW_QUESTION = 'add_new_question';
export const ADD_NEW_QUESTION_END = 'add_new_question_end';
export const ADD_NEW_QUESTION_SUCCESS = 'add_new_question_success';
export const ADD_NEW_QUESTION_FAILED = 'add_new_question_failed';
export const ADD_NEW_QUESTION_URL = SERVERIP + '/api/questions/create';

export const DEL_QUESTION = 'del_question';
export const DEL_QUESTION_END = 'del_question_end';
export const DEL_QUESTION_SUCCESS = 'del_question_success';
export const DEL_QUESTION_FAILED = 'del_question_failed';
export const DEL_QUESTION_URL = SERVERIP + '/api/questions/delete';

export const EDIT_QUESTION = 'eidt_question';
export const EDIT_QUESTION_END = 'eidt_question_end';
export const EDIT_QUESTION_SUCCESS = 'eidt_question_success';
export const EDIT_QUESTION_FAILED = 'eidt_question_failed';
export const EDIT_QUESTION_URL = SERVERIP + '/api/questions/update';

export const ADD_NEW_SESSION = 'add_new_session';
export const ADD_NEW_SESSION_END = 'add_new_session_end';
export const ADD_NEW_SESSION_SUCCESS = 'add_new_session_success';
export const ADD_NEW_SESSION_FAILED = 'add_new_session_failed';
export const ADD_NEW_SESSION_URL = SERVERIP + '/api/sessions/create';

export const ADD_NEW_TRAINING = 'add_new_training';
export const ADD_NEW_TRAINING_END = 'add_new_training_end';
export const ADD_NEW_TRAINING_SUCCESS = 'add_new_training_success';
export const ADD_NEW_TRAINING_FAILED = 'add_new_training_failed';
export const ADD_NEW_TRAINING_URL = SERVERIP + '/api/trainings/create';

export const DEL_TRAINING = 'del_training';
export const DEL_TRAINING_END = 'del_training_end';
export const DEL_TRAINING_SUCCESS = 'del_training_success';
export const DEL_TRAINING_FAILED = 'del_training_failed';
export const DEL_TRAINING_URL = SERVERIP + '/api/trainings/delete';

export const EDIT_TRAINING = 'edit_training';
export const EDIT_TRAINING_END = 'edit_training_end';
export const EDIT_TRAINING_SUCCESS = 'edit_training_success';
export const EDIT_TRAINING_FAILED = 'edit_training_failed';
export const EDIT_TRAINING_URL = SERVERIP + '/api/trainings/update';

export const DEL_SESSION = 'del_session';
export const DEL_SESSION_END = 'del_session_end';
export const DEL_SESSION_SUCCESS = 'del_session_success';
export const DEL_SESSION_FAILED = 'del_session_failed';
export const DEL_SESSION_URL = SERVERIP + '/api/sessions/delete';

export const GET_SESSION_QUESTINLIST = 'get_session_questionlist';
export const GET_SESSION_QUESTINLIST_END = 'get_session_questionlist_end';
export const GET_SESSION_QUESTINLIST_SUCCESS = 'get_session_questionlist_success';
export const GET_SESSION_QUESTINLIST_FAILED = 'get_session_questionlist_failed';
export const GET_SESSION_QUESTINLIST_URL = SERVERIP + '/api/sessions/get-questions';

export const EDIT_SESSION = 'edit_session';
export const EDIT_SESSION_END = 'edit_session_end';
export const EDIT_SESSION_SUCCESS = 'edit_session_success';
export const EDIT_SESSION_FAILED = 'edit_session_failed';
export const EDIT_SESSION_URL = SERVERIP + '/api/sessions/update';


export const TRAIN_REDUX_CLEAN = 'train_redux_clean';

export const GET_TRAIN_SESSIONLIST = 'get_train_sessionlist';
export const GET_TRAIN_SESSIONLIST_END = 'get_train_sessionlist_end';
export const GET_TRAIN_SESSIONLIST_SUCCESS = 'get_train_sessionlist_success';
export const GET_TRAIN_SESSIONLIST_FAILED = 'get_train_sessionlist_failed';
export const GET_TRAIN_SESSIONLIST_URL = SERVERIP + '/api/trainings/get-sessions';

export const DEL_CANDIDATE = 'del_candidate';
export const DEL_CANDIDATE_END = 'del_candidate_end';
export const DEL_CANDIDATE_SUCCESS = 'del_candidate_success';
export const DEL_CANDIDATE_FAILED = 'del_candidate_failed';
export const DEL_CANDIDATE_URL = SERVERIP + '/api/candidates/delete';

export const EDIT_CANDIDATE = 'edit_candidate';
export const EDIT_CANDIDATE_END = 'edit_candidate_end';
export const EDIT_CANDIDATE_SUCCESS = 'edit_candidate_success';
export const EDIT_CANDIDATE_FAILED = 'edit_candidate_failed';
export const EDIT_CANDIDATE_URL = SERVERIP + '/api/candidates/update';

export const GET_TRAIN_CANDIDATELIST = 'get_train_candidatelist';
export const GET_TRAIN_CANDIDATELIST_END = 'get_train_candidatelist_end';
export const GET_TRAIN_CANDIDATELIST_SUCCESS = 'get_train_candidatelist_success';
export const GET_TRAIN_CANDIDATELIST_FAILED = 'get_train_candidatelist_failed';
export const GET_TRAIN_CANDIDATELIST_URL = SERVERIP + '/api/trainings/get-candidates';

export const GET_TRAIN_RESULTSLIST = 'get_train_resultslist';
export const GET_TRAIN_RESULTSLIST_END = 'get_train_resultslist_end';
export const GET_TRAIN_RESULTSLIST_SUCCESS = 'get_train_resultslist_success';
export const GET_TRAIN_RESULTSLIST_FAILED = 'get_train_resultslist_failed';
export const GET_TRAIN_RESULTSLIST_URL = SERVERIP + '/api/trainings/get-training-results';

export const GET_TRAIN_RESULT = 'get_train_result';
export const GET_TRAIN_RESULT_END = 'get_train_result_end';
export const GET_TRAIN_RESULT_SUCCESS = 'get_train_result_success';
export const GET_TRAIN_RESULT_FAILED = 'get_train_result_failed';
export const GET_TRAIN_RESULT_URL = SERVERIP + '/api/candidates/get-training-result';

export const SET_REVIEW_SHOWFLAG = 'set_review_showflag';

export const GET_ALL_RESULTS = 'get_all_results';
export const GET_ALL_RESULTS_END = 'get_all_results_end';
export const GET_ALL_RESULTS_SUCCESS = 'get_all_results_success';
export const GET_ALL_RESULTS_FAILED = 'get_all_results_failed';
export const GET_ALL_RESULTS_URL = SERVERIP + '/api/candidates/get-training-results-with-content';



