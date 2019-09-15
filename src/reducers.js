import { combineReducers } from 'redux'
import { auth } from './redux/Auth.redux';
import { counter } from './redux/App.redux';

export default combineReducers({
    auth,
    counter
})