import {
    SET_TITLE_COLOR,
    SET_TAG_COLOR,
    ADD_NEW_CANDIDATES,
    SET_CHANGE_CANDIDATES,
    SET_NEW_TITLE,
    SET_NEW_DESCRIPTION,
    ADD_NEW_QUESTION,
    DEL_QUESTION,
    EDIT_QUESTION,
    ADD_NEW_SESSION,
    ADD_NEW_TRAINING,
    DEL_TRAINING,
    EDIT_TRAINING,
    DEL_SESSION,
    GET_SESSION_QUESTINLIST,
    EDIT_SESSION,
    TRAIN_REDUX_CLEAN,
    GET_TRAIN_SESSIONLIST,
    DEL_CANDIDATE,
    EDIT_CANDIDATE,
    GET_TRAIN_CANDIDATELIST,
    GET_TRAIN_RESULTSLIST,
    GET_TRAIN_RESULT,
    SET_REVIEW_SHOWFLAG,
    GET_ALL_RESULTS,
} from '../common/ActionTypes';


export const setTitleColor = (title, color) => ({
    type: SET_TITLE_COLOR,
    title: title,
    color: color,
})

export const setTagColor = (tags) => ({
    type: SET_TAG_COLOR,
    tags: tags,
})

export const addNewCandidate = (canData, callback) => ({
    type: ADD_NEW_CANDIDATES,
    payload: canData,
    call: callback, 
})

export const setChkCandidate = (chkedData) => ({
    type: SET_CHANGE_CANDIDATES,
    payload: chkedData,
})

export const setTitle = (title) => ({
    type: SET_NEW_TITLE,
    title: title,
})

export const setDescription = (description) => ({
    type: SET_NEW_DESCRIPTION,
    description: description,
})

export const addQuestion = (quizdata, callback) => ({
    type: ADD_NEW_QUESTION,
    payload: quizdata,
    call: callback, 
})

export const delQuestion = (quizid, callback) => ({
    type: DEL_QUESTION,
    payload: quizid,
    call: callback, 
})

export const editQuestion = (quizdata, callback) => ({
    type: EDIT_QUESTION,
    payload: quizdata,
    call: callback, 
})

export const addSession = (sessiondata, callback) => ({
    type: ADD_NEW_SESSION,
    payload: sessiondata,
    call: callback, 
})

export const addTraining = (traindata, callback) => ({
    type: ADD_NEW_TRAINING,
    payload: traindata,
    call: callback, 
})

export const deleteTrain = (trainid, callback) => ({
    type: DEL_TRAINING,
    payload: trainid,
    call: callback, 
})

export const editTraining = (traindata, callback) => ({
    type: EDIT_TRAINING,
    payload: traindata,
    call: callback, 
})

export const deleteSession = (sessionid, callback) => ({
    type: DEL_SESSION,
    payload: sessionid,
    call: callback, 
})

export const getQuestionList = (sessionData, callback) => ({
    type: GET_SESSION_QUESTINLIST,
    payload: sessionData,
    call: callback, 
})

export const editionSession = (sessiondata, callback) => ({
    type: EDIT_SESSION,
    payload: sessiondata,
    call: callback, 
})

export const trainReduxClean = () => ({
    type: TRAIN_REDUX_CLEAN,
})

export const getSessionList = (trainData, callback) => ({
    type: GET_TRAIN_SESSIONLIST,
    payload: trainData,
    call: callback, 
})

export const deleteCandidate = (canid, callback) =>({
    type: DEL_CANDIDATE,
    payload: canid,
    call: callback, 
})

export const editCandidate = (candata, callback) => ({
    type: EDIT_CANDIDATE,
    payload: candata,
    call: callback, 
})

export const getCandidateList = (trainData, callback) => ({
    type: GET_TRAIN_CANDIDATELIST,
    payload: trainData,
    call: callback, 
})

export const getTrainResultList = (trainId, callback) => ({
    type: GET_TRAIN_RESULTSLIST,
    payload: trainId,
    call: callback, 
})

export const getTrain_result = (data, callback) => ({
    type: GET_TRAIN_RESULT,
    payload: data,
    call: callback, 
})

export const setReviewShowFlag = (data) => ({
    type: SET_REVIEW_SHOWFLAG,
    payload: data,
})

export const getAllResults = (data, callback) => ({
    type: GET_ALL_RESULTS,
    payload: data,
    call: callback, 
})





