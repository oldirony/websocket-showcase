import {combineReducers } from 'redux';
import {} from 'react-redux';
import projectsReducer from './reducer-projects'
import teamMemberReducer from './reducer-team-member'


export default combineReducers({
	projects : projectsReducer,
	teamMember : teamMemberReducer
});