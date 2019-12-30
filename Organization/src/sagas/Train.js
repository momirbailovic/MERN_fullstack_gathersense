import { 
    put, 
    takeLatest, 
    all, 
} from 'redux-saga/effects';
import { 
    EDIT_ORGAN,
    EDIT_ORGAN_START,
    EDIT_ORGAN_END,
    EDIT_ORGAN_URL,
    EDIT_ORGAN_FAILED,
    EDIT_ORGAN_SUCCESS,
    DELETE_ORGAN,
    DELETE_ORGAN_START,
    DELETE_ORGAN_END,
    DELETE_ORGAN_URL,
    DELETE_ORGAN_FAILED,
    DELETE_ORGAN_SUCCESS,

    ADD_NEW_CANDIDATES,
    ADD_NEW_CANDIDATES_END,
    ADD_NEW_CANDIDATES_SUCCESS,
    ADD_NEW_CANDIDATES_FAILED, 
    ADD_NEW_CANDIDATES_URL,

    ADD_NEW_QUESTION,
    ADD_NEW_QUESTION_END,
    ADD_NEW_QUESTION_SUCCESS,
    ADD_NEW_QUESTION_FAILED, 
    ADD_NEW_QUESTION_URL,

    DEL_QUESTION,
    DEL_QUESTION_END,
    DEL_QUESTION_SUCCESS,
    DEL_QUESTION_FAILED, 
    DEL_QUESTION_URL,

    EDIT_QUESTION,
    EDIT_QUESTION_END,
    EDIT_QUESTION_SUCCESS,
    EDIT_QUESTION_FAILED, 
    EDIT_QUESTION_URL,

    ADD_NEW_SESSION,
    ADD_NEW_SESSION_END,
    ADD_NEW_SESSION_SUCCESS,
    ADD_NEW_SESSION_FAILED, 
    ADD_NEW_SESSION_URL,

    ADD_NEW_TRAINING,
    ADD_NEW_TRAINING_END,
    ADD_NEW_TRAINING_SUCCESS,
    ADD_NEW_TRAINING_FAILED, 
    ADD_NEW_TRAINING_URL,

    DEL_TRAINING,
    DEL_TRAINING_END,
    DEL_TRAINING_SUCCESS,
    DEL_TRAINING_FAILED, 
    DEL_TRAINING_URL,

    EDIT_TRAINING,
    EDIT_TRAINING_END,
    EDIT_TRAINING_SUCCESS,
    EDIT_TRAINING_FAILED, 
    EDIT_TRAINING_URL,

    DEL_SESSION,
    DEL_SESSION_END,
    DEL_SESSION_SUCCESS,
    DEL_SESSION_FAILED, 
    DEL_SESSION_URL,

    GET_SESSION_QUESTINLIST,
    GET_SESSION_QUESTINLIST_END,
    GET_SESSION_QUESTINLIST_SUCCESS,
    GET_SESSION_QUESTINLIST_FAILED, 
    GET_SESSION_QUESTINLIST_URL,

    EDIT_SESSION,
    EDIT_SESSION_END,
    EDIT_SESSION_SUCCESS,
    EDIT_SESSION_FAILED, 
    EDIT_SESSION_URL,

    GET_TRAIN_SESSIONLIST,
    GET_TRAIN_SESSIONLIST_END,
    GET_TRAIN_SESSIONLIST_SUCCESS,
    GET_TRAIN_SESSIONLIST_FAILED, 
    GET_TRAIN_SESSIONLIST_URL,

    DEL_CANDIDATE,
    DEL_CANDIDATE_END,
    DEL_CANDIDATE_SUCCESS,
    DEL_CANDIDATE_FAILED, 
    DEL_CANDIDATE_URL,

    EDIT_CANDIDATE,
    EDIT_CANDIDATE_END,
    EDIT_CANDIDATE_SUCCESS,
    EDIT_CANDIDATE_FAILED, 
    EDIT_CANDIDATE_URL,

    GET_TRAIN_CANDIDATELIST,
    GET_TRAIN_CANDIDATELIST_END,
    GET_TRAIN_CANDIDATELIST_SUCCESS,
    GET_TRAIN_CANDIDATELIST_FAILED, 
    GET_TRAIN_CANDIDATELIST_URL,

    GET_TRAIN_RESULTSLIST,
    GET_TRAIN_RESULTSLIST_END,
    GET_TRAIN_RESULTSLIST_SUCCESS,
    GET_TRAIN_RESULTSLIST_FAILED, 
    GET_TRAIN_RESULTSLIST_URL,

    GET_TRAIN_RESULT,
    GET_TRAIN_RESULT_END,
    GET_TRAIN_RESULT_SUCCESS,
    GET_TRAIN_RESULT_FAILED, 
    GET_TRAIN_RESULT_URL,

    GET_ALL_RESULTS,
    GET_ALL_RESULTS_END,
    GET_ALL_RESULTS_SUCCESS,
    GET_ALL_RESULTS_FAILED, 
    GET_ALL_RESULTS_URL,

} from '../common/ActionTypes';

function* addCandi(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(ADD_NEW_CANDIDATES_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                //'Accept': 'application/json',
                //'Content-Type': 'multipart/form-data',                
            },
            body: action.payload
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.candidate;
        })

        if (json !== undefined){
            yield put({ type: ADD_NEW_CANDIDATES_END, addstate: ADD_NEW_CANDIDATES_SUCCESS});
            action.call(json.id);
        }
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: ADD_NEW_CANDIDATES_END, addstate: ADD_NEW_CANDIDATES_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherAddCandi() {
    yield takeLatest(ADD_NEW_CANDIDATES, addCandi);
}

function* addQuiz(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(ADD_NEW_QUESTION_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                //'Accept': 'application/json',
                //'Content-Type': 'multipart/form-data',                
            },
            body: action.payload
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.question;
        })

        if (json !== undefined ){
            yield put({ type: ADD_NEW_QUESTION_END, quizState: ADD_NEW_QUESTION_SUCCESS});
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
        yield put({ type: ADD_NEW_QUESTION_END, quizState: ADD_NEW_QUESTION_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherAddQuiz() {
    yield takeLatest(ADD_NEW_QUESTION, addQuiz);
}

function* deleteQuiz(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(DEL_QUESTION_URL, {
            method: 'delete',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.id;
        })
        if (json !== undefined){
            yield put({ type: DEL_QUESTION_END, editstate: DEL_QUESTION_SUCCESS});
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
        yield put({ type: DEL_QUESTION_END, editstate: DEL_QUESTION_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherDeleteQuiz() {
    yield takeLatest(DEL_QUESTION, deleteQuiz);
}

function* editQuiz(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(EDIT_QUESTION_URL, {
            method: 'put',
            headers: {
                authorization: token,
                //'Accept': 'application/json',
                //'Content-Type': 'multipart/form-data',                
            },
            body: action.payload
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.question;
        })

        if (json !== undefined ){
            yield put({ type: EDIT_QUESTION_END, quizState: EDIT_QUESTION_SUCCESS});
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
        yield put({ type: EDIT_QUESTION_END, quizState: EDIT_QUESTION_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherEditQuiz() {
    yield takeLatest(EDIT_QUESTION, editQuiz);
}

function* addSession(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(ADD_NEW_SESSION_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',               
            },
            body: JSON.stringify({
                "title": action.payload.title,
                "description": action.payload.description,
                "questions": action.payload.questions,
                "tags": action.payload.tags,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.session;
        })

        if (json !== undefined ){
            yield put({ type: ADD_NEW_SESSION_END, sessionState: ADD_NEW_SESSION_SUCCESS});
            action.call(json);
            return;
        }

    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: ADD_NEW_SESSION_END, sessionState: ADD_NEW_SESSION_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherAddSession() {
    yield takeLatest(ADD_NEW_SESSION, addSession);
}

function* addTrain(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(ADD_NEW_TRAINING_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',               
            },
            body: JSON.stringify({
                "title": action.payload.title,
                "color": action.payload.color,
                "description": action.payload.description,
                "tags": action.payload.tags,
                "candidates": action.payload.candidates,
                "sessions": action.payload.sessions,
                "organization": action.payload.organization,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.training;
        })

        if (json !== undefined ){
            yield put({ type: ADD_NEW_TRAINING_SUCCESS, sessionState: ADD_NEW_TRAINING_SUCCESS, trainId: json.id});
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
        yield put({ type: ADD_NEW_TRAINING_END, sessionState: ADD_NEW_TRAINING_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherAddTrain() {
    yield takeLatest(ADD_NEW_TRAINING, addTrain);
}

function* deleteTraining(action) {
    const token = localStorage.getItem('GSOtoken');
    console.log(action.payload)
    try {
        const json = yield fetch(DEL_TRAINING_URL, {
            method: 'delete',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.id;
        })
        if (json !== undefined){
            yield put({ type: DEL_TRAINING_END, trainState: DEL_TRAINING_SUCCESS});
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
        yield put({ type: DEL_TRAINING_END, editstate: DEL_TRAINING_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherDeleteTrainin() {
    yield takeLatest(DEL_TRAINING, deleteTraining);
}

function* editTrain(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(EDIT_TRAINING_URL, {
            method: 'put',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',               
            },
            body: JSON.stringify({
                "id": action.payload.id,
                "title": action.payload.title,
                "color": action.payload.color,
                "description": action.payload.description,
                "tags": action.payload.tags,
                "candidates": action.payload.candidates,
                "sessions": action.payload.sessions,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.training;
        })

        if (json !== undefined ){
            yield put({ type: EDIT_TRAINING_END, quizState: EDIT_TRAINING_SUCCESS});
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
        yield put({ type: EDIT_TRAINING_END, quizState: EDIT_TRAINING_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherEditTrain() {
    yield takeLatest(EDIT_TRAINING, editTrain);
}

function* deleteSession(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(DEL_SESSION_URL, {
            method: 'delete',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.id;
        })
        if (json !== undefined){
            yield put({ type: DEL_SESSION_END, editstate: DEL_SESSION_SUCCESS});
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
        yield put({ type: DEL_SESSION_END, editstate: DEL_SESSION_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherDeleteSession() {
    yield takeLatest(DEL_SESSION, deleteSession);
}

function* sessionQuizList(action) {
    const token = localStorage.getItem('GSOtoken');
    try {
        const json = yield fetch(GET_SESSION_QUESTINLIST_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload.id,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.questions;
        })
        if (json !== undefined){
            yield put({ type: GET_SESSION_QUESTINLIST_END, editstate: GET_SESSION_QUESTINLIST_SUCCESS, questionList: json});
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
        yield put({ type: GET_SESSION_QUESTINLIST_END, editstate: GET_SESSION_QUESTINLIST_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherGetSessionQuizList() {
    yield takeLatest(GET_SESSION_QUESTINLIST, sessionQuizList);
}

function* editSession(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(EDIT_SESSION_URL, {
            method: 'put',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',               
            },
            body: JSON.stringify({
                "id": action.payload.id,
                "title": action.payload.title,
                "description": action.payload.description,
                "questions": action.payload.questions,
                "tags": action.payload.tags,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.session;
        })

        if (json !== undefined ){
            yield put({ type: EDIT_SESSION_SUCCESS, sessionState: EDIT_SESSION_SUCCESS});
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
        yield put({ type: EDIT_SESSION_END, sessionState: EDIT_SESSION_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherEditSession() {
    yield takeLatest(EDIT_SESSION, editSession);
}

function* trainSessionList(action) {
    const token = localStorage.getItem('GSOtoken');
    console.log(action.payload.id);
    try {
        const json = yield fetch(GET_TRAIN_SESSIONLIST_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload.id,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.sessions;
        })
        if (json !== undefined){
            yield put({ type: GET_TRAIN_SESSIONLIST_END, trainState: GET_TRAIN_SESSIONLIST_SUCCESS, sessionList: json});
            action.call(json);
            console.log(json)
        }
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: GET_TRAIN_SESSIONLIST_END, trainState: GET_TRAIN_SESSIONLIST_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherGetTrainSessionList() {
    yield takeLatest(GET_TRAIN_SESSIONLIST, trainSessionList);
}

function* deleteCandidate(action) {
    const token = localStorage.getItem('GSOtoken');
    console.log(action.payload)
    try {
        const json = yield fetch(DEL_CANDIDATE_URL, {
            method: 'delete',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload,
            })
        })
        if (json !== undefined){
            yield put({ type: DEL_CANDIDATE_END, editstate: DEL_CANDIDATE_SUCCESS});
            action.call(json.id);
        }
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: DEL_CANDIDATE_END, editstate: DEL_CANDIDATE_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherDeleteCandidate() {
    yield takeLatest(DEL_CANDIDATE, deleteCandidate);
}

function* editCandidate(action) {
    const token = localStorage.getItem('GSOtoken');
    
    try {
        const json = yield fetch(EDIT_CANDIDATE_URL, {
            method: 'put',
            headers: {
                authorization: token,
                //'Accept': 'application/json',
                //'Content-Type': 'multipart/form-data',                
            },
            body: action.payload
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.candidate;
        })

        if (json !== undefined ){
            yield put({ type: EDIT_CANDIDATE_SUCCESS, sessionState: EDIT_CANDIDATE_SUCCESS});
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
        yield put({ type: EDIT_CANDIDATE_END, sessionState: EDIT_CANDIDATE_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherEditCandidate() {
    yield takeLatest(EDIT_CANDIDATE, editCandidate);
}

function* trainCanList(action) {
    const token = localStorage.getItem('GSOtoken');
    try {
        const json = yield fetch(GET_TRAIN_CANDIDATELIST_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload.id,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.candidates;
        })
        if (json !== undefined){
            yield put({ type: GET_TRAIN_CANDIDATELIST_END, trainState: GET_TRAIN_CANDIDATELIST_SUCCESS, candidateList: json});
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
        yield put({ type: GET_TRAIN_CANDIDATELIST_END, trainState: GET_TRAIN_CANDIDATELIST_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherGetTrainCanList() {
    yield takeLatest(GET_TRAIN_CANDIDATELIST, trainCanList);
}

function* trainResultList(action) {
    const token = localStorage.getItem('GSOtoken');
    try {
        const json = yield fetch(GET_TRAIN_RESULTSLIST_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.training_results;
        })
        if (json !== undefined){
            yield put({ type: GET_TRAIN_RESULTSLIST_END, trainState: GET_TRAIN_RESULTSLIST_SUCCESS, trainingresultList: json});
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
        yield put({ type: GET_TRAIN_RESULTSLIST_END, trainState: GET_TRAIN_RESULTSLIST_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherGetTrainResultsList() {
    yield takeLatest(GET_TRAIN_RESULTSLIST, trainResultList);
}

function* trainResult(action) {
    const token = localStorage.getItem('GSOtoken');
    console.log(action.payload.candidateId)
    try {
        const json = yield fetch(GET_TRAIN_RESULT_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload.candidateId,
                "training": action.payload.trainId,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.training_result;
        })
        if (json !== undefined){
            yield put({ type: GET_TRAIN_RESULT_END, trainState: GET_TRAIN_RESULT_SUCCESS, train_result: json});
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
        yield put({ type: GET_TRAIN_RESULT_END, trainState: GET_TRAIN_RESULT_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherGetTrainResult() {
    yield takeLatest(GET_TRAIN_RESULT, trainResult);
}

function* getViewAllResultList(action) {
    const token = localStorage.getItem('GSOtoken');
    console.log(action.payload)
    try {
        const json = yield fetch(GET_ALL_RESULTS_URL, {
            method: 'POST',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload,
            })
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.training_results;
        })
        if (json !== undefined){
            yield put({ type: GET_ALL_RESULTS_END, trainState: GET_ALL_RESULTS_SUCCESS, train_all_results: json});
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
        yield put({ type: GET_ALL_RESULTS_END, trainState: GET_ALL_RESULTS_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherGetViewAllResultList() {
    yield takeLatest(GET_ALL_RESULTS, getViewAllResultList);
}




function* editOrgan(action) {
    const token = localStorage.getItem('GSOtoken');
    yield put({ type: EDIT_ORGAN_START, addstate: EDIT_ORGAN_START });
    
    try {
        const json = yield fetch(EDIT_ORGAN_URL, {
            method: 'PUT',
            headers: {
                authorization: token,
                //'Accept': 'application/json',
                //'Content-Type': 'multipart/form-data',                
            },
            body: action.payload
        })
        .then(
            response => response.json()
        )
        .then((responseJson) => {
            return responseJson.organization;
        })
        localStorage.setItem('GSOuserName', json.name);
        localStorage.setItem('GSOuserEmail', json.email);
        localStorage.setItem('GSOuserDescription', json.description);
        localStorage.setItem('GSOuserPhoto', json.photo);
        yield put({ type: EDIT_ORGAN_SUCCESS, editstate: EDIT_ORGAN_SUCCESS});
        // refresh
        action.call();
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: EDIT_ORGAN_END, editstate: EDIT_ORGAN_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherEditOrgan() {
    yield takeLatest(EDIT_ORGAN, editOrgan);
}

function* deleteOrgan(action) {
    const token = localStorage.getItem('GSOtoken');
    
    yield put({ type: DELETE_ORGAN_START, addstate: DELETE_ORGAN_START });
    try {
        yield fetch(DELETE_ORGAN_URL, {
            method: 'delete',
            headers: {
                authorization: token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": action.payload.id,
            })
        })
        yield put({ type: DELETE_ORGAN_SUCCESS, editstate: DELETE_ORGAN_SUCCESS});
        //refresh

        action.call();
    }catch (error) {
        let errorMessage;
        console.log(error.status)
        switch (error.status) {
            case 500: errorMessage = 'Internal Server Error'; break;
            case 422: errorMessage = 'Invalid credentials'; break;
            default: errorMessage = 'Something went wrong'; break;
        }
        yield put({ type: DELETE_ORGAN_END, editstate: DELETE_ORGAN_FAILED, errorMessage: errorMessage});
    }
}

function* actionWatcherDeleteOrgan() {
    yield takeLatest(DELETE_ORGAN, deleteOrgan);
}

export default function* Auth() {
    yield all([
        actionWatcherAddCandi(),
        actionWatcherAddQuiz(),
        actionWatcherDeleteQuiz(),
        actionWatcherEditQuiz(),
        actionWatcherAddSession(),
        actionWatcherAddTrain(),
        actionWatcherDeleteTrainin(),
        actionWatcherEditTrain(),
        actionWatcherDeleteSession(),
        actionWatcherGetSessionQuizList(),
        actionWatcherEditSession(),
        actionWatcherGetTrainSessionList(),
        actionWatcherDeleteCandidate(),
        actionWatcherEditCandidate(),
        actionWatcherGetTrainCanList(),
        actionWatcherGetTrainResultsList(),
        actionWatcherGetTrainResult(),
        actionWatcherGetViewAllResultList(),


        actionWatcherEditOrgan(),
        actionWatcherDeleteOrgan(),
    ]);
}