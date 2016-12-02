import {
	DOCTOR_FORM_NEW_FOCUS,
	DOCTOR_FORM_NEW_CHANGE,
	DOCTOR_FORM_NEW_VALIDATION,
	DOCTOR_FORM_NEW_CLEAR,
	DOCTOR_FORM_EDIT_FILL
} from '../types/formNew';

import {DATE_NULL} from '../../common/config';

const fields = {first_name: '', last_name: '', password: '', password_retype: '', email: '', birthday: DATE_NULL, phone: '', address: '', job_title: '', description: ''};
const INITIAL_STATE = {values: fields, errors: {...fields, birthday: ''}, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case DOCTOR_FORM_NEW_FOCUS:
			return {...state, touched: true};
		case DOCTOR_FORM_NEW_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case DOCTOR_FORM_NEW_VALIDATION:
			return {...state, errors: {...payload}};
		case DOCTOR_FORM_NEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case DOCTOR_FORM_EDIT_FILL:
			return {...state, values: {...payload}};
	}
	return state;
};