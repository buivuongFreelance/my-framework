import {BODY_LOGIN_SHOW, BODY_LOGIN_HIDE} from './ThemeTypes';

const INITIAL_STATE = {bodyLogin: false};

export default (state = INITIAL_STATE, {type, payload}) => {
	switch(type){
		case BODY_LOGIN_SHOW:
			return {...state, bodyLogin: payload};
		case BODY_LOGIN_HIDE:
			return {...state, bodyLogin: payload};
	}
	return state;
};