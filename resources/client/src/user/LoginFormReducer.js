import {ON_CHANGE_FIELD, ON_FOCUS_FIELD, ON_VALIDATION_FIELD} from '../common/types/FormTypes';

import {ATTR_FORM} from '../common/config/form';

const INITIAL_STATE = {email: ATTR_FORM, password: ATTR_FORM, submitting: false, touched: false};

export default (state = INITIAL_STATE, {type, payload}) => {
	switch(type){
		case ON_CHANGE_FIELD:
			return {...state, [payload.field]: {...state[payload.field], value: payload.value}};
		case ON_FOCUS_FIELD:
			return {...state, touched: true};
		case ON_VALIDATION_FIELD:
			return {...state, submitting: payload.submitting, [payload.field]: {...state[payload.field], error: payload.params.error, valid: payload.params.valid}};
	}
	return state;
};