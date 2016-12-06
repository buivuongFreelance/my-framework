import {
	CAT_FAQ_FORM_NEW_FOCUS,
	CAT_FAQ_FORM_NEW_CHANGE,
	CAT_FAQ_FORM_NEW_VALIDATION,
	CAT_FAQ_FORM_NEW_CLEAR,
	CAT_FAQ_FORM_EDIT_FILL
} from '../types/formNew';

import {DATE_NULL} from '../../common/config';

const fields = {name: '', description: ''};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case CAT_FAQ_FORM_NEW_FOCUS:
			return {...state, touched: true};
		case CAT_FAQ_FORM_NEW_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case CAT_FAQ_FORM_NEW_VALIDATION:
			return {...state, errors: {...payload}};
		case CAT_FAQ_FORM_NEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case CAT_FAQ_FORM_EDIT_FILL:
			return {...state, values: {...payload}};
	}
	return state;
};