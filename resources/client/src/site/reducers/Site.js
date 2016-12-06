import {
	SITE_VIEW_DETAIL,
	SITE_VIEW_CLEAR
} from '../types/view';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case SITE_VIEW_DETAIL:
			return {...state, ...payload};
		case SITE_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};