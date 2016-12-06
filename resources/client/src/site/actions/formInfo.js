import {
	SITE_FORM_INFO_FOCUS,
	SITE_FORM_INFO_CHANGE,
	SITE_FORM_INFO_VALIDATION,
	SITE_FORM_INFO_CLEAR,
	SITE_FORM_INFO_FILL
} from '../types/formInfo';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const siteFormInfoFocus = () => {
	return {
		type: SITE_FORM_INFO_FOCUS,
		payload: true
	};
};

export const siteFormInfoChange = (field, value) => {
	return {
		type: SITE_FORM_INFO_CHANGE,
		payload: {field, value}
	};
};

export const siteFormInfoValidation = (errors) => {
	return {
		type: SITE_FORM_INFO_VALIDATION,
		payload: errors
	};
};

export const siteFormInfoClear = () => {
	return {
		type: SITE_FORM_INFO_CLEAR,
		payload: false
	};
};

export const siteFormInfoFill = values => {
	return {
		type: SITE_FORM_INFO_FILL,
		payload: values
	};
};

export const siteFormInfoEditSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.site.updateInfo, values)
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

export const siteFormSocialEditSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.site.updateSocial, values)
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