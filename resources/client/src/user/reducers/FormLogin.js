import {
	USER_FORM_LOGIN_CHANGE_EMAIL,
	USER_FORM_LOGIN_CHANGE_PASSWORD,
	USER_FORM_LOGIN_FOCUS,
	USER_FORM_LOGIN_VALIDATION_EMAIL,
	USER_FORM_LOGIN_SUBMIT
} from '../types/form';

const fields = {
	email: '',
	password: ''
}

const INITIAL_STATE = {errors: fields, values: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case USER_FORM_LOGIN_CHANGE_EMAIL:
			return {...state, values: {...state.values, ['email']: action.payload}};
	}
	return state;
};