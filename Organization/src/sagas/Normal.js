import { 
    put, 
    takeLatest, 
    all,
} from 'redux-saga/effects';
import { 
    GET_DATA,
    // GET_DATA_URL_ADMIN,
    // GET_DATA_URL_ORGAN,
    GET_DATA_URL_CANDI,
    GET_DATA_URL_TRAIN,
    GET_DATA_START,
    GET_DATA_END,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,    
  } from '../common/ActionTypes';

//const getToken = (state) => state.Auth.token;

function* getData(action) {

    //const token = yield select(getToken);
    
    const token = localStorage.getItem('GSOtoken');
    yield put({ type: GET_DATA_END, getstate: GET_DATA_START });
    //admin
    // const json_admin = yield fetch(GET_DATA_URL_ADMIN, {
    //     method: 'GET',
    //     headers: {
    //         authorization: token
    //     }
    // })
    // .then(
    //     response => response.json()
    // )
    // .then((responseJson) => {
    //     return responseJson.administrators;
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
    //organazation
    // const json_organ = yield fetch(GET_DATA_URL_ORGAN, {
    //     method: 'GET',
    //     headers: {
    //         authorization: token
    //     }
    // })
    // .then(
    //     response => response.json()
    // )
    // .then((responseJson) => {
    //     return responseJson.organizations;
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
    //candidate
    const organizationID = localStorage.getItem('GSOuserId');
    // console.log(organizationID)
    const json_candi = yield fetch(GET_DATA_URL_CANDI, {
        method: 'POST',
        headers: {
            authorization: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": organizationID,
        })
    })
    .then(
        response => response.json()
    )
    .then((responseJson) => {
        return responseJson.candidates;
    })
    .catch((error) => {
        console.error(error);
    });
    //training
    const json_train = yield fetch(GET_DATA_URL_TRAIN, {
        method: 'POST',
        headers: {
            authorization: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": organizationID,
        })
    })
    .then(
        response => response.json()
    )
    .then((responseJson) => {
        return responseJson.trainings;
    })
    .catch((error) => {
        console.error(error);
    });
    if (json_candi.length >= 0 && json_train.length >= 0){        
        // console.log(json_candi)
        // console.log(json_train)
        yield put({ 
            type: GET_DATA_END, 
            getstate: GET_DATA_SUCCESS, 
            // json_admin: json_admin, 
            // json_organ: json_organ, 
            json_candi: json_candi, 
            json_train: json_train 
        });
    } else
        yield put({ type: GET_DATA_END, loginstate: GET_DATA_FAILED});

    //action.call();

}

function* actionWatcherGetData() {
    yield takeLatest(GET_DATA, getData);
}

export default function* Auth() {
    yield all([
        actionWatcherGetData(),
    ]);
}