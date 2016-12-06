import {
	BLOG_FORM_NEW_FOCUS,
	BLOG_FORM_NEW_CHANGE,
	BLOG_FORM_NEW_VALIDATION,
	BLOG_FORM_NEW_CLEAR,
	BLOG_FORM_EDIT_FILL
} from '../types/formNew';

const fields = {name: '', description: '', content: '', seo_title: ''};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case BLOG_FORM_NEW_FOCUS:
			return {...state, touched: true};
		case BLOG_FORM_NEW_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case BLOG_FORM_NEW_VALIDATION:
			return {...state, errors: {...payload}};
		case BLOG_FORM_NEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case BLOG_FORM_EDIT_FILL:
			return {...state, values: {...payload}};
	}
	return state;
};