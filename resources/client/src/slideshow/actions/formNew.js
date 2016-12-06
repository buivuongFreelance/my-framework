import {
	SLIDESHOW_FORM_NEW_FOCUS,
	SLIDESHOW_FORM_NEW_CHANGE,
	SLIDESHOW_FORM_NEW_VALIDATION,
	SLIDESHOW_FORM_NEW_CLEAR,
	SLIDESHOW_FORM_EDIT_FILL
} from '../types/formNew';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const slideshowFormNewFocus = () => {
	return {
		type: SLIDESHOW_FORM_NEW_FOCUS,
		payload: true
	};
};

export const slideshowFormNewChange = (field, value) => {
	return {
		type: SLIDESHOW_FORM_NEW_CHANGE,
		payload: {field, value}
	};
};

export const slideshowFormNewValidation = (errors) => {
	return {
		type: SLIDESHOW_FORM_NEW_VALIDATION,
		payload: errors
	};
};

export const slideshowFormNewSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.slideshow.create, values)
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

export const slideshowFormNewClear = () => {
	return {
		type: SLIDESHOW_FORM_NEW_CLEAR,
		payload: false
	};
};

export const slideshowFormEditFill = values => {
	return {
		type: SLIDESHOW_FORM_EDIT_FILL,
		payload: values
	};
};

export const slideshowFormEditSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.slideshow.update, values)
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