import {
	USER_PATIENT_AUTH_LOGIN,
	USER_PATIENT_AUTH_LOGOUT
} from '../types';

const INITIAL_STATE = {email: '', name: '', authenticate: false};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case USER_PATIENT_AUTH_LOGIN:
			return {...state, ...action.payload};
		case USER_PATIENT_AUTH_LOGOUT:
			return {...state, ...action.payload};
	}
	return state;
};