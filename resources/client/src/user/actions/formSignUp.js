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
	USER_FORM_SIGNUP_CHANGE_ADDRESS,
	USER_FORM_SIGNUP_CHANGE_BIRTHDAY,
	USER_FORM_SIGNUP_CLEAR
} from '../types/formSignUp';

import axios from 'axios';
import Block from '../../common/components/block';
import {push} from 'react-router-redux';

export const userFormSignUpFocus = () => {
	return (dispatch, getState) => {
		const {touched} = getState().userFormSignUp;
		if(!touched)
			dispatch({
				type: USER_FORM_SIGNUP_FOCUS,
				payload: true
			});
	}
};

export const userFormSignUpChangeFirstName = value => {
	return dispatch => {
		if(!is.empty(value))
			if(value.length < 4)
				dispatch(userFormSignUpValidationFirstName('global.error.min.length:4'));
			else
				dispatch(userFormSignUpValidationFirstName(''));
		else
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
			dispatch(userFormSignUpValidationRePassword('global.error.re.password'));
			dispatch(userFormSignUpValidationPassword(''));
		}else{
			dispatch(userFormSignUpValidationPassword(''));
			dispatch(userFormSignUpValidationRePassword(''));
		}

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

		if(password !== value)
			dispatch(userFormSignUpValidationRePassword('global.error.re.password'));
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

export const userFormSignUpChangeBirthday = value => {
	return {
		type: USER_FORM_SIGNUP_CHANGE_BIRTHDAY,
		payload: value
	};
};

export const userFormSignUpStep1 = () => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const userFormSignUp = getState().userFormSignUp;
			const {touched, values, errors} = userFormSignUp;

			if(!touched)
				dispatch(userFormSignUpFocus());

			dispatch(userFormSignUpChangeFirstName(values.first_name));
			dispatch(userFormSignUpChangeLastName(values.last_name));
			dispatch(userFormSignUpChangeEmail(values.email));
			dispatch(userFormSignUpChangeBirthday(values.birthday));
			dispatch(userFormSignUpChangePassword(values.password));
			dispatch(userFormSignUpChangeAddress(values.address));
			resolve();
		});
	};
};

export const userFormSignUpStep2 = (element) => {
	return (dispatch, getState) => {
		const userFormSignUp = getState().userFormSignUp;
		const {errors, values} = userFormSignUp;

		if(!errors.email && !errors.password && !errors.password_retype
			&& !errors.first_name && !errors.last_name
			&& !errors.birthday && !errors.address){
			Block.show(element);
			setTimeout(() => {
				axios.post('/authenticate/user/signup', values)
				.then(data => {
					const message = getState().intl.messages['page.user.signup.msg.success'];

					toastr.success(message);
					dispatch(push('/auth/user/signin'));
					Block.hide(element);
				})
				.catch(error => {
					if(error.response){
						let message = '';
						if(error.response.status === 401){
							const errors = error.response.data;
							for(let field in errors)
								message = errors[field][0];
						}else
							message = error.response.data.message;
						toastr.error(message);
						Block.hide(element);
					}
				})
			}, 2000);
		}
	};
};

export const userFormSignUpSubmit = (element) => {
	return (dispatch) => {
		dispatch(userFormSignUpStep1())
		.then(() => {
			dispatch(userFormSignUpStep2(element));
		});
	};
};

export const userFormSignUpClear = () => {
	return {
		type: USER_FORM_SIGNUP_CLEAR,
		payload: true
	};
};