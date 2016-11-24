import {
	USER_PATIENT_REGISTRATION_CHANGE_FIELD,
	USER_PATIENT_REGISTRATION_FOCUS_FIELD,
	USER_PATIENT_REGISTRATION_VALIDATION_FIELD
} from '../types';
import {ATTR_FORM} from '../../common/config/form';

const INITIAL_STATE = {name: ATTR_FORM, email: ATTR_FORM, password: ATTR_FORM, rePassword: ATTR_FORM,
	 birthday: {...ATTR_FORM, valid: true, value: '1900-01-01'}, phone: {...ATTR_FORM, valid: true}, address: {...ATTR_FORM, valid: true},
	 submitting: false, touched: false};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case USER_PATIENT_REGISTRATION_CHANGE_FIELD:
			return {...state, [action.payload.field]: {...state[action.payload.field], value: action.payload.value}};
		case USER_PATIENT_REGISTRATION_FOCUS_FIELD:
			return {...state, touched: true};
		case USER_PATIENT_REGISTRATION_VALIDATION_FIELD:
			return {...state, ...action.payload};
	}
	return state;
};