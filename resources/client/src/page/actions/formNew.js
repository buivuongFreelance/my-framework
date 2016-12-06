import {
	PAGE_FORM_NEW_FOCUS,
	PAGE_FORM_NEW_CHANGE,
	PAGE_FORM_NEW_VALIDATION,
	PAGE_FORM_NEW_CLEAR,
	PAGE_FORM_EDIT_FILL
} from '../types/formNew';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const pageFormNewFocus = () => {
	return {
		type: PAGE_FORM_NEW_FOCUS,
		payload: true
	};
};

export const pageFormNewChange = (field, value) => {
	return {
		type: PAGE_FORM_NEW_CHANGE,
		payload: {field, value}
	};
};

export const pageFormNewValidation = (errors) => {
	return {
		type: PAGE_FORM_NEW_VALIDATION,
		payload: errors
	};
};

export const pageFormNewSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.page.create, values)
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

export const pageFormNewClear = () => {
	return {
		type: PAGE_FORM_NEW_CLEAR,
		payload: false
	};
};

export const pageFormEditFill = values => {
	return {
		type: PAGE_FORM_EDIT_FILL,
		payload: values
	};
};

export const pageFormEditSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.page.update, values)
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