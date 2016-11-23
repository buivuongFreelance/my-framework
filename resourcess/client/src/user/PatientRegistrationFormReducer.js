import {ON_CHANGE_FIELD, ON_FOCUS_FIELD, ON_VALIDATION_FIELD} from '../common/types/FormTypes';

import {ATTR_FORM} from '../common/config/form';

const INITIAL_STATE = {name: ATTR_FORM, email: ATTR_FORM, password: ATTR_FORM, rePassword: ATTR_FORM,
	 birthday: {...ATTR_FORM, valid: true}, phone: {...ATTR_FORM, valid: true}, address: {...ATTR_FORM, valid: true},
	 submitting: false, touched: false};

export default (state = INITIAL_STATE, {type, payload}) => {
	switch(type){
		case ON_CHANGE_FIELD:
			return {...state, [payload.field]: {...state[payload.field], value: payload.value}};
		case ON_FOCUS_FIELD:
			return {...state, touched: true};
		case ON_VALIDATION_FIELD:
			if(!is.empty(payload.mainField))
				return {...state, submitting: payload.submitting, [payload.mainField]: {...state[payload.mainField], error: payload.params.error, valid: payload.params.valid}, [payload.field]: {...state[payload.field], error: '', valid: true}};
			else
				return {...state, submitting: payload.submitting, [payload.field]: {...state[payload.field], error: payload.params.error, valid: payload.params.valid}};
	}
	return state;
};