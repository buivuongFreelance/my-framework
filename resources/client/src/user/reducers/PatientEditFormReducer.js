import {
	USER_PATIENT_EDIT_CHANGE_FIELD,
	USER_PATIENT_EDIT_FOCUS_FIELD,
	USER_PATIENT_EDIT_VALIDATION_FIELD,
	USER_PATIENT_EDIT_LOAD
} from '../types';
import {ATTR_FORM} from '../../common/config/form';

const INITIAL_STATE = {name: ATTR_FORM, birthday: {...ATTR_FORM, valid: true, value: '1900-01-01'}, phone: {...ATTR_FORM, valid: true}, address: {...ATTR_FORM, valid: true},
	 submitting: false, touched: false};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case USER_PATIENT_EDIT_CHANGE_FIELD:
			return {...state, [action.payload.field]: {...state[action.payload.field], value: action.payload.value}};
		case USER_PATIENT_EDIT_FOCUS_FIELD:
			return {...state, touched: true};
		case USER_PATIENT_EDIT_VALIDATION_FIELD:
			return {...state, ...action.payload};
		case USER_PATIENT_EDIT_LOAD:
			return {...state, name: {...state.name, value: action.payload.name}, phone: {...state.phone, value: action.payload.phone}, address: {...state.address, value: action.payload.address}, birthday: {...state.birthday, value: action.payload.birthday}};
	}
	return state;
};