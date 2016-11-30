import {
	USER_AUTH_SIGNIN,
	USER_AUTH_SIGNOUT
} from '../types/auth';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case USER_AUTH_SIGNIN:
			return {...state, ...action.payload};
		case USER_AUTH_SIGNOUT:
			return {...state, email: '', name: ''};	
	}
	return state;
};