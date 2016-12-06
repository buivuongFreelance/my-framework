import {
	PAGE_FORM_NEW_FOCUS,
	PAGE_FORM_NEW_CHANGE,
	PAGE_FORM_NEW_VALIDATION,
	PAGE_FORM_NEW_CLEAR,
	PAGE_FORM_EDIT_FILL
} from '../types/formNew';

import {DATE_NULL} from '../../common/config';

const fields = {name: '', seo_title: '', content: ''};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case PAGE_FORM_NEW_FOCUS:
			return {...state, touched: true};
		case PAGE_FORM_NEW_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case PAGE_FORM_NEW_VALIDATION:
			return {...state, errors: {...payload}};
		case PAGE_FORM_NEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case PAGE_FORM_EDIT_FILL:
			return {...state, values: {...payload}};
	}
	return state;
};