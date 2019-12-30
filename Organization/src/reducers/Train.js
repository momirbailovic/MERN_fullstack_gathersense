import {
    SET_TITLE_COLOR,
    SET_TAG_COLOR,
    ADD_NEW_CANDIDATES,
    ADD_NEW_CANDIDATES_END,
    SET_CHANGE_CANDIDATES,
    SET_NEW_TITLE,
    SET_NEW_DESCRIPTION,
    ADD_NEW_QUESTION,
    ADD_NEW_QUESTION_END,
    DEL_QUESTION,
    DEL_QUESTION_END,
    EDIT_QUESTION,
    EDIT_QUESTION_END,
    ADD_NEW_SESSION,
    ADD_NEW_SESSION_END,
    ADD_NEW_TRAINING,
    ADD_NEW_TRAINING_SUCCESS,
    ADD_NEW_TRAINING_END,
    DEL_TRAINING,
    DEL_TRAINING_END,
    EDIT_TRAINING,
    EDIT_TRAINING_END,
    DEL_SESSION,
    DEL_SESSION_END,
    GET_SESSION_QUESTINLIST,
    GET_SESSION_QUESTINLIST_END,
    
    EDIT_SESSION,
    EDIT_SESSION_SUCCESS,
    EDIT_SESSION_END,

    GET_TRAIN_SESSIONLIST,
    GET_TRAIN_SESSIONLIST_END,
    DEL_CANDIDATE,
    DEL_CANDIDATE_END,
    EDIT_CANDIDATE,
    EDIT_CANDIDATE_END,

    GET_TRAIN_CANDIDATELIST,
    GET_TRAIN_CANDIDATELIST_END,
    
    GET_TRAIN_RESULTSLIST,
    GET_TRAIN_RESULTSLIST_END,

    GET_TRAIN_RESULT,
    GET_TRAIN_RESULT_END,

    SET_REVIEW_SHOWFLAG,

    TRAIN_REDUX_CLEAN,

    GET_ALL_RESULTS,
    GET_ALL_RESULTS_END,


} from '../common/ActionTypes';

const INIT_STATE = {
    loading: false,
    // train
    trainId: '',
    color: '',
    title: '',
    tags: [],
    chkedCanData: [],
    description: '',
    sessionIDs: [],
    sessionList: [],
    // session
    sessionTitle: '',
    sessionDescription: '',
    questionList: [],
    sessionId: '',
    // candidate
    candidateId: '',
    candidateList: [],
    candidateName: '',
    candidatePhoto: '',
    candidateDepartment: '',
    // report
    reportShowFlag: 0,

};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {        
        case SET_TITLE_COLOR: {
            return {
                ...state,
                title: action.title,
                color: action.color,
                trainId: '',
            }
        }                
        case SET_TAG_COLOR: {
            return {
                ...state,
                tags: action.tags,
            }
        }                 
        case ADD_NEW_CANDIDATES: {
            return {
                ...state,
                canData: action.payload,
                loading: true,
            }
        }
        case ADD_NEW_CANDIDATES_END: {
            return {
                ...state,
                ANCState: action.ANCState,
                loading: false,
            }
        }         
        case SET_CHANGE_CANDIDATES: {
            return {
                ...state,
                chkedCanData: action.payload,
            }
        }         
        case SET_NEW_TITLE: {
            return {
                ...state,
                title: action.title,
            }
        }          
        case SET_NEW_DESCRIPTION: {
            return {
                ...state,
                description: action.description,
            }
        } 
        case ADD_NEW_QUESTION: {
            return {
                ...state,
                quizData: action.payload,
                loading: true,
            }
        }
        case ADD_NEW_QUESTION_END: {
            return {
                ...state,
                quizState: action.quizState,
                loading: false,
            }
        }
        case DEL_QUESTION: {
            return {
                ...state,
                quizData: action.payload,
                loading: true,
            }
        }
        case DEL_QUESTION_END: {
            return {
                ...state,
                quizState: action.quizState,
                loading: false,
            }
        }
        case EDIT_QUESTION: {
            return {
                ...state,
                quizData: action.payload,
                loading: true,
            }
        }
        case EDIT_QUESTION_END: {
            return {
                ...state,
                quizState: action.quizState,
                loading: false,
            }
        }
        case ADD_NEW_SESSION: {
            return {
                ...state,
                canData: action.payload,
                loading: true,
            }
        }
        case ADD_NEW_SESSION_END: {
            return {
                ...state,
                sessionState: action.sessionState,
                sessionId: '',
                sessionTitle: '',
                questionList: [],
                loading: false,
            }
        }
        case ADD_NEW_TRAINING: {
            return {
                ...state,
                trainData: action.payload,
                loading: true,
            }
        }
        case ADD_NEW_TRAINING_SUCCESS: {
            return {
                ...state,
                // trainState: action.trainState,
                // color: '',
                // title: '',
                // //tags: [],
                // chkedCanData: [],
                // description: '',
                // sessionId: '',
                // sessionTitle: '',
                // questionList: [],
                trainId: action.trainId,
                loading: false,
            }
        }
        case ADD_NEW_TRAINING_END: {
            return {
                ...state,
                trainState: action.trainState,
                loading: false,
            }
        }
        case DEL_TRAINING: {
            return {
                ...state,
                trainData: action.payload,
                loading: true,
            }
        }
        case DEL_TRAINING_END: {
            return {
                ...state,
                trainState: action.trainState,
                loading: false,
            }
        }
        case EDIT_TRAINING: {
            return {
                ...state,
                trainData: action.payload,
                loading: true,
            }
        }
        case EDIT_TRAINING_END: {
            return {
                ...state,
                trainState: action.trainState,
                loading: false,
            }
        }        
        case DEL_SESSION: {
            return {
                ...state,
                sessionData: action.payload,
                loading: true,
            }
        }
        case DEL_SESSION_END: {
            return {
                ...state,
                sessionState: action.sessionState,
                loading: false,
            }
        }                
        case GET_SESSION_QUESTINLIST: {
            return {
                ...state,
                sessionId: action.payload.id,
                sessionTitle: action.payload.sessionTitle,
                sessionDescription: action.payload.sessionDescription,
                loading: true,
            }
        }
        case GET_SESSION_QUESTINLIST_END: {
            return {
                ...state,
                sessionState: action.sessionState,
                questionList: action.questionList,
                loading: false,
            }
        }
        case EDIT_SESSION: {
            return {
                ...state,
                sessionData: action.payload,
                loading: true,
            }
        }
        case EDIT_SESSION_SUCCESS: {
            return {
                ...state,
                sessionState: action.sessionState,
                sessionId: '',
                sessionTitle: '',
                questionList: [],
                loading: false,
            }
        }
        case EDIT_SESSION_END: {
            return {
                ...state,
                sessionState: action.sessionState,
                loading: false,
            }
        }                
        case GET_TRAIN_SESSIONLIST: {
            return {
                ...state,
                trainId: action.payload.id,
                title: action.payload.title,
                color: action.payload.color,
                description: action.payload.description,
                sessionIDs: action.payload.sessions,
                tags: action.payload.tags,
                chkedCanData: action.payload.candidates,
                loading: true,
            }
        }
        case GET_TRAIN_SESSIONLIST_END: {
            return {
                ...state,
                trainState: action.trainState,
                sessionList: action.sessionList,
                loading: false,
            }
        }
        case DEL_CANDIDATE: {
            return {
                ...state,
                canData: action.payload,
                loading: true,
            }
        }
        case DEL_CANDIDATE_END: {
            return {
                ...state,
                canState: action.canState,
                loading: false,
            }
        }
        case EDIT_CANDIDATE: {
            return {
                ...state,
                canData: action.payload,
                loading: true,
            }
        }
        case EDIT_CANDIDATE_END: {
            return {
                ...state,
                canState: action.canState,
                loading: false,
            }
        }
        case GET_TRAIN_CANDIDATELIST: {
            return {
                ...state,
                trainId: action.payload.id,
                title: action.payload.title,
                color: action.payload.color,
                description: action.payload.description,
                sessionIDs: action.payload.sessions,
                tags: action.payload.tags,
                chkedCanData: action.payload.candidates,
                loading: true,
            }
        }
        case GET_TRAIN_CANDIDATELIST_END: {
            return {
                ...state,
                trainState: action.trainState,
                candidateList: action.candidateList,
                loading: false,
            }
        }
        case GET_TRAIN_RESULTSLIST: {
            return {
                ...state,
                trainId: action.payload,
                loading: true,
            }
        }
        case GET_TRAIN_RESULTSLIST_END: {
            return {
                ...state,
                trainState: action.trainState,
                trainingresultList: action.trainingresultList,
                loading: false,
            }
        }
        case GET_TRAIN_RESULT: {
            return {
                ...state,
                trainId: action.payload.trainId,
                candidateId: action.payload.candidateId,
                candidatePhoto: action.payload.photo,
                candidateName: action.payload.name,
                candidateDepartment: action.payload.department,
                loading: true,
            }
        }
        case GET_TRAIN_RESULT_END: {
            return {
                ...state,
                train_result: action.train_result,
                loading: false,
            }
        }

        case SET_REVIEW_SHOWFLAG: {
            return {
                ...state,
                reportShowFlag: action.payload,
            }
        }
        case GET_ALL_RESULTS: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_ALL_RESULTS_END: {
            return {
                ...state,
                trainState: action.trainState,
                train_all_results: action.train_all_results,
                loading: false,
            }
        }








        case TRAIN_REDUX_CLEAN: {
            return {
                ...state,                
                loading: false,
                trainId: '',
                color: '',
                title: '',
                tags: [],
                chkedCanData: [],
                description: '',
                sessionTitle: '',
                sessionDescription: '',
                questionList: [],
                sessionId: '',
                sessionList: [],
                sessionIDs: [],
                candidateList: [],
                candidateId: '',
                candidatePhoto: '',
                candidateDepartment: '',
                train_result: [],
                reportShowFlag: 0,

            }
        }
        default: 
            return state;
    }
};
export default reducer;

