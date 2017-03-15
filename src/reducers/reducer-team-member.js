import { SELECT_TEAM_MEMBER } from '../actions';

const INITIAL_STATE = { };

export default function (state = INITIAL_STATE, action) {
	switch (action.type){
		case SELECT_TEAM_MEMBER:
			return action.payload;
		default:
			return state;
	}
}