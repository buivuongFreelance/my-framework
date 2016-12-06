import {
	QUALIFICATION_FORM_NEW_FOCUS,
	QUALIFICATION_FORM_NEW_CHANGE,
	QUALIFICATION_FORM_NEW_VALIDATION,
	QUALIFICATION_FORM_NEW_CLEAR,
	QUALIFICATION_FORM_EDIT_FILL
} from '../types/formNew';

import {DATE_NULL} from '../../common/config';

const fields = {name: '', description: '', avatar: null};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case QUALIFICATION_FORM_NEW_FOCUS:
			return {...state, touched: true};
		case QUALIFICATION_FORM_NEW_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case QUALIFICATION_FORM_NEW_VALIDATION:
			return {...state, errors: {...payload}};
		case QUALIFICATION_FORM_NEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case QUALIFICATION_FORM_EDIT_FILL:
			return {...state, values: {name: payload.name, description: payload.description}};
	}
	return state;
};