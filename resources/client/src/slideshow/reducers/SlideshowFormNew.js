import {
	SLIDESHOW_FORM_NEW_FOCUS,
	SLIDESHOW_FORM_NEW_CHANGE,
	SLIDESHOW_FORM_NEW_VALIDATION,
	SLIDESHOW_FORM_NEW_CLEAR,
	SLIDESHOW_FORM_EDIT_FILL
} from '../types/formNew';

import {DATE_NULL} from '../../common/config';

const fields = {name: '', description: '', avatar: null};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case SLIDESHOW_FORM_NEW_FOCUS:
			return {...state, touched: true};
		case SLIDESHOW_FORM_NEW_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case SLIDESHOW_FORM_NEW_VALIDATION:
			return {...state, errors: {...payload}};
		case SLIDESHOW_FORM_NEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case SLIDESHOW_FORM_EDIT_FILL:
			return {...state, values: {...payload, avatar: null}};
	}
	return state;
};