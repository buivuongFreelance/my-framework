import {
	USER_FORM_SIGNIN_FOCUS,
	USER_FORM_SIGNIN_CHANGE,
	USER_FORM_SIGNIN_VALIDATION_EMAIL,
	USER_FORM_SIGNIN_VALIDATION_PASSWORD,
	USER_FORM_SIGNIN_CLEAR
} from '../types/formSignIn';

import {
	THEME_NO_ACTION
} from '../../theme/types';

import axios from 'axios';
import API from '../../common/config/api';

export const userFormSignInFocus = () => {
	return {
		type: USER_FORM_SIGNIN_FOCUS,
		payload: true
	};
};

export const userFormSignInChange = (field, value) => {
	return {
		type: USER_FORM_SIGNIN_CHANGE,
		payload: {field, value}
	};
};

export const userFormSignInClear = () => {
	return {
		type: USER_FORM_SIGNIN_CLEAR,
		payload: true
	};
};

export const userBackendFormSignInSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.user.signIn, values)
				.then(response => {
					resolve(response.data);
					dispatch({type: THEME_NO_ACTION});
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
						reject(message);
					}
				});
			}, 1500);
		});
	};
};