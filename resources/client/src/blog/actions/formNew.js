import {
	BLOG_FORM_NEW_FOCUS,
	BLOG_FORM_NEW_CHANGE,
	BLOG_FORM_NEW_VALIDATION,
	BLOG_FORM_NEW_CLEAR,
	BLOG_FORM_EDIT_FILL
} from '../types/formNew';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const blogFormNewFocus = () => {
	return {
		type: BLOG_FORM_NEW_FOCUS,
		payload: true
	};
};

export const blogFormNewChange = (field, value) => {
	return {
		type: BLOG_FORM_NEW_CHANGE,
		payload: {field, value}
	};
};

export const blogFormNewValidation = (errors) => {
	return {
		type: BLOG_FORM_NEW_VALIDATION,
		payload: errors
	};
};

export const blogFormNewSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.blog.create, values)
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

export const blogFormNewClear = () => {
	return {
		type: BLOG_FORM_NEW_CLEAR,
		payload: false
	};
};

export const blogFormEditFill = values => {
	return {
		type: BLOG_FORM_EDIT_FILL,
		payload: values
	};
};

export const blogFormEditSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.blog.update, values)
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