import {
	SERVICE_FORM_NEW_FOCUS,
	SERVICE_FORM_NEW_CHANGE,
	SERVICE_FORM_NEW_VALIDATION,
	SERVICE_FORM_NEW_CLEAR,
	SERVICE_FORM_EDIT_FILL
} from '../types/formNew';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const serviceFormNewFocus = () => {
	return {
		type: SERVICE_FORM_NEW_FOCUS,
		payload: true
	};
};

export const serviceFormNewChange = (field, value) => {
	return {
		type: SERVICE_FORM_NEW_CHANGE,
		payload: {field, value}
	};
};

export const serviceFormNewValidation = (errors) => {
	return {
		type: SERVICE_FORM_NEW_VALIDATION,
		payload: errors
	};
};

export const serviceFormNewSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.service.create, values)
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
			}, TIMEOUT);
		});
	};
};

export const serviceFormNewClear = () => {
	return {
		type: SERVICE_FORM_NEW_CLEAR,
		payload: false
	};
};

export const serviceFormEditFill = values => {
	return {
		type: SERVICE_FORM_EDIT_FILL,
		payload: values
	};
};

export const serviceFormEditSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.service.update, values)
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
			}, TIMEOUT);
		});
	};
};