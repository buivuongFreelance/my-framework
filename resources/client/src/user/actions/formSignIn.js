import {
	USER_FORM_SIGNIN_FOCUS,
	USER_FORM_SIGNIN_CHANGE_EMAIL,
	USER_FORM_SIGNIN_VALIDATION_EMAIL,
	USER_FORM_SIGNIN_CHANGE_PASSWORD,
	USER_FORM_SIGNIN_VALIDATION_PASSWORD,
} from '../types/formSignIn';

import axios from 'axios';
import Block from '../../common/components/block';
import {push} from 'react-router-redux';

export const userFormSignInFocus = () => {
	return {
		type: USER_FORM_SIGNIN_FOCUS,
		payload: true
	};
};

export const userFormSignInChangeEmail = value => {
	return dispatch => {
		if(is.empty(value))
			dispatch(userFormSignInValidationEmail('global.error.required'));
		else if(!is.email(value))
			dispatch(userFormSignInValidationEmail('global.error.email'));
		else
			dispatch(userFormSignInValidationEmail(''));

		dispatch({
			type: USER_FORM_SIGNIN_CHANGE_EMAIL,
			payload: value
		});
	};
};

export const userFormSignInValidationEmail = error => {
	return {
		type: USER_FORM_SIGNIN_VALIDATION_EMAIL,
		payload: error
	};
};

export const userFormSignInChangePassword = value => {
	return dispatch => {
		if(is.empty(value))
			dispatch(userFormSignInValidationPassword('global.error.required'));
		else if(value.length < 6)
			dispatch(userFormSignInValidationPassword('global.error.min.length:6'));
		else
			dispatch(userFormSignInValidationPassword(''));

		dispatch({
			type: USER_FORM_SIGNIN_CHANGE_PASSWORD,
			payload: value
		});
	};
};

export const userFormSignInValidationPassword = error => {
	return {
		type: USER_FORM_SIGNIN_VALIDATION_PASSWORD,
		payload: error
	};
};

export const userFormSignInStep1 = () => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const userFormSignIn = getState().userFormSignIn;
			const {touched, values, errors} = userFormSignIn;

			if(!touched)
				dispatch(userFormSignInFocus());

			dispatch(userFormSignInChangeEmail(values.email));
			dispatch(userFormSignInChangePassword(values.password));
			resolve();
		});
	};
};

export const userFormSignInStep2 = (element) => {
	return (dispatch, getState) => {
		const userFormSignIn = getState().userFormSignIn;
		const {errors, values} = userFormSignIn;

		if(!errors.email && !errors.password){
			Block.show(element);
			setTimeout(() => {
				axios.post('/authenticate/client/login', values)
				.then(data => {
					console.log('success', data);
					toastr.success('Login Successfully');
					Block.hide(element);
				})
				.catch(error => {
					if(error.response){
						toastr.error(error.response.data.message);
						Block.hide(element);
					}
				})
			}, 2000);
		}
	};
};

export const userFormSignInSubmit = (element) => {
	return (dispatch) => {
		dispatch(userFormSignInStep1())
		.then(() => {
			dispatch(userFormSignInStep2(element));
		});
	};
};