import { SELECT_TEAM_MEMBER, UNSELECT_TEAM_MEMBER } from '../actions';

const INITIAL_STATE = null;

export default function (state = INITIAL_STATE, action) {
	switch (action.type){
		case SELECT_TEAM_MEMBER:
			return action.payload;
		case UNSELECT_TEAM_MEMBER:
			return null;
		default:
			return state;
	}
}