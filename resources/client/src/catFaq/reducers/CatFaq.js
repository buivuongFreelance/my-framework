import {
	CAT_FAQ_VIEW_DETAIL,
	CAT_FAQ_VIEW_CLEAR
} from '../types/view';

const INITIAL_STATE = {name: '', description: ''};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case CAT_FAQ_VIEW_DETAIL:
			return {...state, ...payload};
		case CAT_FAQ_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};