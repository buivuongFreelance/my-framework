import {
	USER_FORM_SIGNUP_FOCUS,
	USER_FORM_SIGNUP_CHANGE_FIRST_NAME,
	USER_FORM_SIGNUP_VALIDATION_FIRST_NAME,
	USER_FORM_SIGNUP_CHANGE_LAST_NAME,
	USER_FORM_SIGNUP_VALIDATION_LAST_NAME,
	USER_FORM_SIGNUP_CHANGE_EMAIL,
	USER_FORM_SIGNUP_VALIDATION_EMAIL,
	USER_FORM_SIGNUP_CHANGE_PASSWORD,
	USER_FORM_SIGNUP_VALIDATION_PASSWORD,
	USER_FORM_SIGNUP_CHANGE_RE_PASSWORD,
	USER_FORM_SIGNUP_VALIDATION_RE_PASSWORD,
	USER_FORM_SIGNUP_CHANGE_ADDRESS
} from '../types/formSignUp';

export const userFormSignUpFocus = () => {
	return {
		type: USER_FORM_SIGNUP_FOCUS,
		payload: true
	};
};

export const userFormSignUpChangeFirstName = value => {
	return dispatch => {
		if(!is.empty(value)){
			if(value.length < 4)
				dispatch(userFormSignUpValidationFirstName('global.error.min.length:4'));
			else
				dispatch(userFormSignUpValidationFirstName(''));
		}else
			dispatch(userFormSignUpValidationFirstName(''));

		dispatch({
			type: USER_FORM_SIGNUP_CHANGE_FIRST_NAME,
			payload: value
		});
	};
};

export const userFormSignUpValidationFirstName = error => {
	return {
		type: USER_FORM_SIGNUP_VALIDATION_FIRST_NAME,
		payload: error
	};
};

export const userFormSignUpChangeLastName = value => {
	return dispatch => {
		if(is.empty(value))
			dispatch(userFormSignUpValidationLastName('global.error.required'));
		else if(value.length < 4)
			dispatch(userFormSignUpValidationLastName('global.error.min.length:4'));
		else
			dispatch(userFormSignUpValidationLastName(''));

		dispatch({
			type: USER_FORM_SIGNUP_CHANGE_LAST_NAME,
			payload: value
		});
	};
};

export const userFormSignUpValidationLastName = error => {
	return {
		type: USER_FORM_SIGNUP_VALIDATION_LAST_NAME,
		payload: error
	};
};

export const userFormSignUpChangeEmail = value => {
	return dispatch => {
		if(is.empty(value))
			dispatch(userFormSignUpValidationEmail('global.error.required'));
		else if(!is.email(value))
			dispatch(userFormSignUpValidationEmail('global.error.email'));
		else
			dispatch(userFormSignUpValidationEmail(''));

		dispatch({
			type: USER_FORM_SIGNUP_CHANGE_EMAIL,
			payload: value
		});
	};
};

export const userFormSignUpValidationEmail = error => {
	return {
		type: USER_FORM_SIGNUP_VALIDATION_EMAIL,
		payload: error
	};
};

export const userFormSignUpChangePassword = value => {
	return (dispatch, getState) => {
		const rePassword = getState().userFormSignUp.values.password_retype;

		if(is.empty(value))
			dispatch(userFormSignUpValidationPassword('global.error.required'));
		else if(value.length < 6)
			dispatch(userFormSignUpValidationPassword('global.error.min.length:6'));
		else if(rePassword !== value){
			dispatch(userFormSignUpValidationPassword(''));
			dispatch(userFormSignUpValidationRePassword('global.error.re.password'));
		}else
			dispatch(userFormSignUpValidationRePassword(''));

		dispatch({
			type: USER_FORM_SIGNUP_CHANGE_PASSWORD,
			payload: value
		});
	};
};

export const userFormSignUpValidationPassword = error => {
	return {
		type: USER_FORM_SIGNUP_VALIDATION_PASSWORD,
		payload: error
	};
};

export const userFormSignUpChangeRePassword = value => {
	return (dispatch, getState) => {
		const password = getState().userFormSignUp.values.password;

		if(!is.empty(value)){
			if(password !== value)
				dispatch(userFormSignUpValidationRePassword('global.error.re.password'));
			else
				dispatch(userFormSignUpValidationRePassword(''));
		}
		else
			dispatch(userFormSignUpValidationRePassword(''));

		dispatch({
			type: USER_FORM_SIGNUP_CHANGE_RE_PASSWORD,
			payload: value
		});
	};
};

export const userFormSignUpValidationRePassword = error => {
	return {
		type: USER_FORM_SIGNUP_VALIDATION_RE_PASSWORD,
		payload: error
	};
};

export const userFormSignUpChangeAddress = value => {
	return (dispatch, getState) => {
		dispatch({
			type: USER_FORM_SIGNUP_CHANGE_ADDRESS,
			payload: value
		});
	};
};