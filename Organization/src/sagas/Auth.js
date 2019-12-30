import { put, takeLatest, all } from 'redux-saga/effects';
import {  
    
    VERIFY_TOKEN,
    VERIFY_TOKEN_END,
    VERIFY_TOKEN_SUCCESS,
    VERIFY_TOKEN_FAILED, 
    VERIFY_TOKEN_URL,

    LOGIN_START,
    LOGIN_END,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_URL,
    LOGOUT,
    LOGOUT_SEVER_URL,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    RESETPW_SEND_EMAIL,
    RESETPW_SEND_EMAIL_END,
    RESETPW_SEND_EMAIL_SUCCESS,
    RESETPW_SEND_EMAIL_FAILED,
    RESETPW_SEND_EMAIL_URL,
    RESETPW_START,
    RESETPW_END,
    RESETPW_SUCCESS,
    RESETPW_FAILED,
    RESETPW_URL,
} from '../common/ActionTypes';

function* verifyToken(action) {

    var token = action.payload;
    var sendtoken = token.substring(6, token.length)
    try {
        const json = yield fetch(VERIFY_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": sendtoken
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.token;
        })
        if (json !== undefined){
            if (json === '')
                localStorage.removeItem('GSOtoken');
            else
                localStorage.setItem('GSOtoken', 'Token ' + json);
            yield put({ type: VERIFY_TOKEN_END, tokenstate: VERIFY_TOKEN_SUCCESS, token: 'Token ' + json });
        }
        
        
        
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: VERIFY_TOKEN_END, tokenstate: VERIFY_TOKEN_FAILED, errorMessage: errorMessage});
    }
       
}

function* actionWatcherVerifyToken() {
    yield takeLatest(VERIFY_TOKEN, verifyToken);
}

function* login(action) {
    yield put({ type: LOGIN_END, loginstate: LOGIN_START });
    try {
        const json = yield fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": action.payload.email,
                "password": action.payload.password,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.organization;
        })
        if (json.token === undefined)
            yield put({ type: LOGIN_END, loginstate: LOGIN_FAILED});
        else{
            localStorage.setItem('GSOuserId', json.id);
            localStorage.setItem('GSOuserName', json.name);
            localStorage.setItem('GSOuserEmail', json.email);
            localStorage.setItem('GSOuserDescription', json.description);
            localStorage.setItem('GSOuserPhoto', json.photo);
            localStorage.setItem('GSOtoken', 'Token ' + json.token);
            yield put({ type: LOGIN_END, loginstate: LOGIN_SUCCESS, email: json.email, id: json.id, name: json.name, token: 'Token ' + json.token });
        }
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: LOGIN_END, loginstate: LOGIN_FAILED, errorMessage: errorMessage});
    }
       
}

function* actionWatcherLogin() {
    yield takeLatest(LOGIN_START, login);
}

function* logout() {
    const token = localStorage.getItem('GSOtoken');
    try {
        yield fetch(LOGOUT_SEVER_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": localStorage.getItem('GSOuserId')
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.organization;  
        })      
        localStorage.removeItem('GSOuserId');
        localStorage.removeItem('GSOuserName');
        localStorage.removeItem('GSOuserEmail');
        localStorage.removeItem('GSOuserDescription');
        localStorage.removeItem('GSOuserPhoto');
        localStorage.removeItem('GSOtoken');
        yield put({ type: LOGOUT_SUCCESS, logoutstate: LOGOUT_SUCCESS});
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: LOGOUT_FAILED, loginstate: LOGOUT_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherLogout() {
    yield takeLatest(LOGOUT, logout);
}

function* resetPWSendEmail(action) {
    try {
        const json = yield fetch(RESETPW_SEND_EMAIL_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": action.payload,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson;  
        })
        if (json !== undefined ){
            yield put({ type: RESETPW_SEND_EMAIL_END, sendemailstate: RESETPW_SEND_EMAIL_SUCCESS});
            action.call(json);
        }
        
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: RESETPW_SEND_EMAIL_END, sendemailstate: RESETPW_SEND_EMAIL_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherSendEmail() {
    yield takeLatest(RESETPW_SEND_EMAIL, resetPWSendEmail);
}

function* resetPW(action) {
    try {
        const json = yield fetch(RESETPW_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "pin": action.payload.pin,
                "password": action.payload.password,
            })
        })        
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.organization;  
        })
        if (json !== undefined ){
            yield put({ type: RESETPW_END, resetpwstate: RESETPW_SUCCESS});
            action.call(json);
        }
        
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: RESETPW_END, resetpwstate: RESETPW_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherResetPW() {
    yield takeLatest(RESETPW_START, resetPW);
}

export default function* Auth() {
    yield all([
        actionWatcherVerifyToken(),
        actionWatcherLogin(),
        actionWatcherLogout(),
        actionWatcherSendEmail(),
        actionWatcherResetPW(),
    ]);
}