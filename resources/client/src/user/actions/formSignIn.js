import {
	USER_FORM_SIGNIN_FOCUS,
	USER_FORM_SIGNIN_CHANGE_EMAIL,
	USER_FORM_SIGNIN_VALIDATION_EMAIL,
	USER_FORM_SIGNIN_CHANGE_PASSWORD,
	USER_FORM_SIGNIN_VALIDATION_PASSWORD,
	USER_FORM_SIGNIN_CLEAR
} from '../types/formSignIn';

import axios from 'axios';
import Block from '../../common/components/block';
import * as UserAuthActions from './auth';

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
				axios.post('/authenticate/user/signin', values)
				.then(response => {
					const message = getState().intl.messages['page.user.signin.msg.success'];
					toastr.success(message);
					dispatch(UserAuthActions.userAuthSignIn(response.data.token, response.data.user));
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

export const userFormSignInSubmit = (element) => {
	return dispatch => {
		dispatch(userFormSignInStep1())
		.then(() => {
			dispatch(userFormSignInStep2(element));
		});
	};
};

export const userFormSignInClear = () => {
	return {
		type: USER_FORM_SIGNIN_CLEAR,
		payload: true
	}
};

export const userBackendFormSignInSubmit = (element) => {

};