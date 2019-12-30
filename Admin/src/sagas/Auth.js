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
                localStorage.removeItem('GSAtoken');
            else
                localStorage.setItem('GSAtoken', 'Token ' + json);
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
            return responseJson.administrator;
        })
        if (json.token === undefined)
            yield put({ type: LOGIN_END, loginstate: LOGIN_FAILED});
        else{
            localStorage.setItem('GSAuserId', json.id);
            localStorage.setItem('GSAuserName', json.name);
            localStorage.setItem('GSAuserEmail', json.email);
            localStorage.setItem('GSAtoken', 'Token ' + json.token);
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
    const token = localStorage.getItem('GSAtoken');
    try {
        yield fetch(LOGOUT_SEVER_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": localStorage.getItem('GSAuserId')
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.administrator;
        })
        localStorage.removeItem('GSAuserId');
        localStorage.removeItem('GSAuserName');
        localStorage.removeItem('GSAuserEmail');
        localStorage.removeItem('GSAtoken');
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

export default function* Auth() {
    yield all([
        actionWatcherVerifyToken(),
        actionWatcherLogin(),
        actionWatcherLogout(),
    ]);
}