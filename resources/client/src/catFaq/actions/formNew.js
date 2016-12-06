import {
	CAT_FAQ_FORM_NEW_FOCUS,
	CAT_FAQ_FORM_NEW_CHANGE,
	CAT_FAQ_FORM_NEW_VALIDATION,
	CAT_FAQ_FORM_NEW_CLEAR,
	CAT_FAQ_FORM_EDIT_FILL
} from '../types/formNew';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const catFaqFormNewFocus = () => {
	return {
		type: CAT_FAQ_FORM_NEW_FOCUS,
		payload: true
	};
};

export const catFaqFormNewChange = (field, value) => {
	return {
		type: CAT_FAQ_FORM_NEW_CHANGE,
		payload: {field, value}
	};
};

export const catFaqFormNewValidation = (errors) => {
	return {
		type: CAT_FAQ_FORM_NEW_VALIDATION,
		payload: errors
	};
};

export const catFaqFormNewSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.catFaq.create, values)
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

export const catFaqFormNewClear = () => {
	return {
		type: CAT_FAQ_FORM_NEW_CLEAR,
		payload: false
	};
};

export const catFaqFormEditFill = values => {
	return {
		type: CAT_FAQ_FORM_EDIT_FILL,
		payload: values
	};
};

export const catFaqFormEditSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.catFaq.update, values)
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