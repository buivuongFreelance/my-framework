import {
	DOCTOR_FORM_NEW_FOCUS,
	DOCTOR_FORM_NEW_CHANGE,
	DOCTOR_FORM_NEW_VALIDATION,
	DOCTOR_FORM_NEW_CLEAR,
	DOCTOR_FORM_EDIT_FILL
} from '../types/formNew';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const doctorFormNewFocus = () => {
	return {
		type: DOCTOR_FORM_NEW_FOCUS,
		payload: true
	};
};

export const doctorFormNewChange = (field, value) => {
	return {
		type: DOCTOR_FORM_NEW_CHANGE,
		payload: {field, value}
	};
};

export const doctorFormNewValidation = (errors) => {
	return {
		type: DOCTOR_FORM_NEW_VALIDATION,
		payload: errors
	};
};

export const doctorFormNewSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.doctor.create, values)
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

export const doctorFormNewClear = () => {
	return {
		type: DOCTOR_FORM_NEW_CLEAR,
		payload: false
	};
};

export const doctorFormEditFill = values => {
	return {
		type: DOCTOR_FORM_EDIT_FILL,
		payload: values
	};
};

export const doctorFormEditSubmit = (values) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.doctor.update, values)
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