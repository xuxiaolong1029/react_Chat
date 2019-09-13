import { combineReducers } from 'redux'
import { auth } from './Auth.redux';
import { counter } from './App.redux';

export default combineReducers({
    auth,
    counter
})