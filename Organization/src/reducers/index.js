import { combineReducers } from 'redux'
import Auth from './Auth';
import Normal from './Normal';
import Admin from './Admin';
import Train from './Train';

export default combineReducers({
    Auth,
    Normal,
    Admin,
    Train,
})


