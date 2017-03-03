import { FETCH_PROJECTS } from '../actions';

const INITIAL_STATE = { all:[], current: null };

export default function (state = INITIAL_STATE, action) {
	switch (action.type){
		case FETCH_PROJECTS:
			return {...state, all: action.payload};
		default:
			return state;
	}
}