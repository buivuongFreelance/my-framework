import {
	THEME_CONFIRM_SHOW,
	THEME_CONFIRM_HIDE,
	THEME_CONFIRM_ACCEPT,
	THEME_CONFIRM_REJECT
} from '../types';

const INITIAL_STATE = {isShow: false, isAccept: false};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case THEME_CONFIRM_SHOW:
			return {...state, isShow: action.payload};
		case THEME_CONFIRM_HIDE:
			return {...state, ...INITIAL_STATE};
		case THEME_CONFIRM_ACCEPT:
			return {...state, isAccept: true};
	}
	return state;
};