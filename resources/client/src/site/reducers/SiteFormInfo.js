import {
	SITE_FORM_INFO_FOCUS,
	SITE_FORM_INFO_CHANGE,
	SITE_FORM_INFO_VALIDATION,
	SITE_FORM_INFO_CLEAR,
	SITE_FORM_INFO_FILL
} from '../types/formInfo';

const fields = {name: '', email: '', address: '', phone: '', avatar: null, facebook_link: '', gplus_link: '', youtube_link: '', instagram_link: '', twitter_link: ''};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case SITE_FORM_INFO_FOCUS:
			return {...state, touched: true};
		case SITE_FORM_INFO_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case SITE_FORM_INFO_VALIDATION:
			return {...state, errors: {...payload}};
		case SITE_FORM_INFO_CLEAR:
			return {...state, ...INITIAL_STATE};
		case SITE_FORM_INFO_FILL:
			return {...state, values: {...payload, avatar: null}};
	}
	return state;
};