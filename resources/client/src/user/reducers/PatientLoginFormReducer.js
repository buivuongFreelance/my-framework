import {
	USER_PATIENT_LOGIN_CHANGE_FIELD,
	USER_PATIENT_LOGIN_FOCUS_FIELD,
	USER_PATIENT_LOGIN_VALIDATION_FIELD
} from '../types';
import {ATTR_FORM} from '../../common/config/form';

const INITIAL_STATE = {email: ATTR_FORM, password: ATTR_FORM, submitting: false, touched: false};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case USER_PATIENT_LOGIN_CHANGE_FIELD:
			return {...state, [action.payload.field]: {...state[action.payload.field], value: action.payload.value}};
		case USER_PATIENT_LOGIN_FOCUS_FIELD:
			return {...state, touched: true};
		case USER_PATIENT_LOGIN_VALIDATION_FIELD:
			return {...state, ...action.payload};
	}
	return state;
};