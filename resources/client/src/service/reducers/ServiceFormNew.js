import {
	SERVICE_FORM_NEW_FOCUS,
	SERVICE_FORM_NEW_CHANGE,
	SERVICE_FORM_NEW_VALIDATION,
	SERVICE_FORM_NEW_CLEAR,
	SERVICE_FORM_EDIT_FILL
} from '../types/formNew';

const fields = {name: '', description: '', content: ''};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case SERVICE_FORM_NEW_FOCUS:
			return {...state, touched: true};
		case SERVICE_FORM_NEW_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case SERVICE_FORM_NEW_VALIDATION:
			return {...state, errors: {...payload}};
		case SERVICE_FORM_NEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case SERVICE_FORM_EDIT_FILL:
			return {...state, values: {...payload}};
	}
	return state;
};