import {ON_CHANGE_FIELD, ON_FOCUS_FIELD, ON_VALIDATION_FIELD} from '../common/types/FormTypes';

import {ATTR_FORM} from '../common/config/form';

const INITIAL_STATE = {name: ATTR_FORM, email: ATTR_FORM, password: ATTR_FORM, rePassword: ATTR_FORM,
	 birthday: {...ATTR_FORM, valid: true}, phone: {...ATTR_FORM, valid: true}, address: {...ATTR_FORM, valid: true},
	 submitting: false, touched: false};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch(action.type){
		case ON_CHANGE_FIELD:
			return {...state, [action.payload.field]: {...state[action.payload.field], value: action.payload.value}};
		case ON_FOCUS_FIELD:
			return {...state, touched: true};
		case ON_VALIDATION_FIELD:
			return {...state};
	}
	return state;
};