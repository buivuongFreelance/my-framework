import {
	QUALIFICATION_FORM_NEW_FOCUS,
	QUALIFICATION_FORM_NEW_CHANGE,
	QUALIFICATION_FORM_NEW_VALIDATION,
	QUALIFICATION_FORM_NEW_CLEAR,
	QUALIFICATION_FORM_EDIT_FILL
} from '../types/formNew';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const qualificationFormNewFocus = () => {
	return {
		type: QUALIFICATION_FORM_NEW_FOCUS,
		payload: true
	};
};

export const qualificationFormNewChange = (field, value) => {
	return {
		type: QUALIFICATION_FORM_NEW_CHANGE,
		payload: {field, value}
	};
};

export const qualificationFormNewValidation = (errors) => {
	return {
		type: QUALIFICATION_FORM_NEW_VALIDATION,
		payload: errors
	};
};

export const qualificationFormNewSubmit = (formData) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.qualification.create, formData)
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

export const qualificationFormNewClear = () => {
	return {
		type: QUALIFICATION_FORM_NEW_CLEAR,
		payload: false
	};
};

export const qualificationFormEditFill = values => {
	return {
		type: QUALIFICATION_FORM_EDIT_FILL,
		payload: values
	};
};

export const qualificationFormEditSubmit = (formData) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.qualification.update, formData)
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