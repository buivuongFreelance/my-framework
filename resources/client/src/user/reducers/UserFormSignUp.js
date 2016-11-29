import {
	USER_FORM_SIGNUP_FOCUS,
	USER_FORM_SIGNUP_CHANGE_FIRST_NAME,
	USER_FORM_SIGNUP_VALIDATION_FIRST_NAME,
	USER_FORM_SIGNUP_CHANGE_LAST_NAME,
	USER_FORM_SIGNUP_VALIDATION_LAST_NAME,
	USER_FORM_SIGNUP_CHANGE_EMAIL,
	USER_FORM_SIGNUP_VALIDATION_EMAIL,
	USER_FORM_SIGNUP_CHANGE_PASSWORD,
	USER_FORM_SIGNUP_VALIDATION_PASSWORD,
	USER_FORM_SIGNUP_CHANGE_RE_PASSWORD,
	USER_FORM_SIGNUP_VALIDATION_RE_PASSWORD,
	USER_FORM_SIGNUP_CHANGE_ADDRESS,
	USER_FORM_SIGNUP_CHANGE_BIRTHDAY,
	USER_FORM_SIGNUP_CLEAR
} from '../types/formSignUp';

import {DATE_NULL} from '../../common/config';

const fields = {first_name: '', last_name: '', email: '', birthday: DATE_NULL, password: '', password_retype: '', address: ''};
const INITIAL_STATE = {values: fields, errors: {...fields, birthday: ''}, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case USER_FORM_SIGNUP_FOCUS:
			return {...state, touched: true};
		case USER_FORM_SIGNUP_CHANGE_FIRST_NAME:
			return {...state, values: {...state.values, first_name: payload}};
		case USER_FORM_SIGNUP_VALIDATION_FIRST_NAME:
			return {...state, errors: {...state.errors, first_name: payload}};
		case USER_FORM_SIGNUP_CHANGE_LAST_NAME:
			return {...state, values: {...state.values, last_name: payload}};
		case USER_FORM_SIGNUP_VALIDATION_LAST_NAME:
			return {...state, errors: {...state.errors, last_name: payload}};
		case USER_FORM_SIGNUP_CHANGE_EMAIL:
			return {...state, values: {...state.values, email: payload}};
		case USER_FORM_SIGNUP_VALIDATION_EMAIL:
			return {...state, errors: {...state.errors, email: payload}};
		case USER_FORM_SIGNUP_CHANGE_PASSWORD:
			return {...state, values: {...state.values, password: payload}};
		case USER_FORM_SIGNUP_VALIDATION_PASSWORD:
			return {...state, errors: {...state.errors, password: payload}};
		case USER_FORM_SIGNUP_CHANGE_RE_PASSWORD:
			return {...state, values: {...state.values, password_retype: payload}};
		case USER_FORM_SIGNUP_VALIDATION_RE_PASSWORD:
			return {...state, errors: {...state.errors, password_retype: payload}};
		case USER_FORM_SIGNUP_CHANGE_ADDRESS:
			return {...state, values: {...state.values, address: payload}};
		case USER_FORM_SIGNUP_CHANGE_BIRTHDAY:
			return {...state, values: {...state.values, birthday: payload}};
		case USER_FORM_SIGNUP_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};