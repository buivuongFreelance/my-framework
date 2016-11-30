import {
	USER_FORM_SIGNIN_FOCUS,
	USER_FORM_SIGNIN_CHANGE,
	USER_FORM_SIGNIN_VALIDATION_EMAIL,
	USER_FORM_SIGNIN_VALIDATION_PASSWORD,
	USER_FORM_SIGNIN_CLEAR
} from '../types/formSignIn';

const fields = {email: '', password: ''};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case USER_FORM_SIGNIN_FOCUS:
			return {...state, touched: true};
		case USER_FORM_SIGNIN_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case USER_FORM_SIGNIN_VALIDATION_EMAIL:
			return {...state, errors: {...state.errors, email: payload}};
		case USER_FORM_SIGNIN_VALIDATION_PASSWORD:
			return {...state, errors: {...state.errors, password: payload}};
		case USER_FORM_SIGNIN_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};