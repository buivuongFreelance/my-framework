import {
	USER_PATIENT_REGISTRATION_CHANGE_FIELD,
	USER_PATIENT_REGISTRATION_FOCUS_FIELD,
	USER_PATIENT_REGISTRATION_VALIDATION_FIELD,
	USER_PATIENT_REGISTRATION_SUBMIT,
	USER_PATIENT_LOGIN_CHANGE_FIELD,
	USER_PATIENT_LOGIN_FOCUS_FIELD,
	USER_PATIENT_LOGIN_VALIDATION_FIELD
} from '../types';
import {API_URL} from '../../common/config';
import {push} from 'react-router-redux';
import {GetValidationField} from '../../common/helpers';

export const userPatientRegistrationChangeField = (field, value) => {
	return {
		type: USER_PATIENT_REGISTRATION_CHANGE_FIELD,
		payload: {field, value}
	};
};

export const userPatientRegistrationFocusField = () => {
	return {
		type: USER_PATIENT_REGISTRATION_FOCUS_FIELD,
		payload: true
	};
};

export const userPatientRegistrationValidationField = (field, errors, reducer) => {
	return (dispatch, getState) => {
		const reducers = GetValidationField(field, errors, reducer, getState());
		dispatch({
			type: USER_PATIENT_REGISTRATION_VALIDATION_FIELD,
			payload: reducers
		});
	};
};

export const userPatientLoginChangeField = (field, value) => {
	return {
		type: USER_PATIENT_LOGIN_CHANGE_FIELD,
		payload: {field, value}
	};
};

export const userPatientLoginFocusField = () => {
	return {
		type: USER_PATIENT_LOGIN_FOCUS_FIELD,
		payload: true
	};
};

export const userPatientLoginValidationField = (field, errors, reducer) => {
	return (dispatch, getState) => {
		const reducers = GetValidationField(field, errors, reducer, getState());
		dispatch({
			type: USER_PATIENT_LOGIN_VALIDATION_FIELD,
			payload: reducers
		});
	};
};

export const userPatientRegistrationSubmit = (values) => {
	return (dispatch, getState) => {
		$.post(`${API_URL}/authenticate/client/register`, values, data => {
			toastr.success('Register Successfully');
			dispatch(push('/auth/client/login'));
		})
		.fail(data => {
			if(data.status === 401){
				const messages = JSON.parse(data.responseText);
				for(let field in messages){
					let message = messages[field];
					toastr.error(message[0]);
				}
			}
		});
	};
};

export const userPatientLoginSubmit = (values) => {
	return (dispatch, getState) => {
		$.post(`${API_URL}/authenticate/client/login`, values, data => {
			toastr.success('Login Successfully');
			dispatch(push('/'));
		})
		.fail(data => {
			if(data.status === 401){
				const messages = JSON.parse(data.responseText);
				for(let field in messages){
					let message = messages[field];
					toastr.error(message[0]);
				}
			}else if(data.status === 500){
				const error = JSON.parse(data.responseText);
				toastr.error(error.message);
			}
		});
	};
};