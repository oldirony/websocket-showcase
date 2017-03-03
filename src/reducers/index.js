import {combineReducers } from 'redux';
import {} from 'react-redux';
import projectsReducer from './reducer-projects'


export default combineReducers({
	projects : projectsReducer
});