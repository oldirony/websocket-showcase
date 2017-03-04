import { FETCH_PROJECTS, SELECT_PROJECT, CLOSE_PROJECT } from '../actions';

const INITIAL_STATE = { all:[], current: null };

export default function (state = INITIAL_STATE, action) {
	switch (action.type){
		case FETCH_PROJECTS:
			return {...state, all: action.payload};
		case SELECT_PROJECT:
			return {...state, current: action.payload};
		case CLOSE_PROJECT:
			return {...state, current: null};
		default:
			return state;
	}
}