import {
	USER_PATIENT_REGISTRATION_CHANGE_FIELD,
	USER_PATIENT_REGISTRATION_FOCUS_FIELD,
	USER_PATIENT_REGISTRATION_VALIDATION_FIELD,
	USER_PATIENT_REGISTRATION_SUBMIT,
	USER_PATIENT_LOGIN_CHANGE_FIELD,
	USER_PATIENT_LOGIN_FOCUS_FIELD,
	USER_PATIENT_LOGIN_VALIDATION_FIELD,
	USER_PATIENT_EDIT_CHANGE_FIELD,
	USER_PATIENT_EDIT_FOCUS_FIELD,
	USER_PATIENT_EDIT_VALIDATION_FIELD,
	USER_PATIENT_EDIT_LOAD,
	USER_PATIENT_EDIT_SUBMIT,
	USER_PATIENT_AUTH_LOGIN,
	USER_PATIENT_AUTH_LOGOUT,
	USER_PATIENT_API_DETAIL
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

export const userPatientEditChangeField = (field, value) => {
	return {
		type: USER_PATIENT_EDIT_CHANGE_FIELD,
		payload: {field, value}
	};
};

export const userPatientEditFocusField = () => {
	return {
		type: USER_PATIENT_EDIT_FOCUS_FIELD,
		payload: true
	};
};

export const userPatientEditValidationField = (field, errors, reducer) => {
	return (dispatch, getState) => {
		const reducers = GetValidationField(field, errors, reducer, getState());
		dispatch({
			type: USER_PATIENT_EDIT_VALIDATION_FIELD,
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
			dispatch(userPatientAuthLogin(data.token, data.user));
			dispatch(push('/auth/client/dashboard'));
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

export const userPatientAuthLogin = (token, user) => {
	localStorage.setItem('patient_token', token);
	localStorage.setItem('email', user.email);
	localStorage.setItem('name', user.name);

	/*$.ajaxSetup({
		beforeSend: function (xhr)
	    {
	       xhr.setRequestHeader('Authorization','BEARER '+localStorage.getItem('patient_token'));
	    }
	});*/

	return {
		type: USER_PATIENT_AUTH_LOGIN,
		payload: {email: user.email, name: user.name, authenticate: true}
	};
};

export const userPatientAuthLogout = () => {
	return (dispatch) => {
		localStorage.removeItem('patient_token');
		localStorage.removeItem('email');
		localStorage.removeItem('name');

		/*$.ajaxSetup({
			beforeSend: function (xhr)
		    {
		       xhr.setRequestHeader('Authorization','BEARER ');
		    }
		});*/

		dispatch({
			type: USER_PATIENT_AUTH_LOGOUT,
			payload: {email: '', name: '', authenticate: false}
		});

		toastr.success('Logout Successfully');
		dispatch(push('/auth/client/dashboard'));
	}
};

export const userPatientApiDetail = (email) => {
	return (dispatch, getState) => {
		$.ajax({
			url: `${API_URL}/client/detail`,
			type: 'POST',
			beforeSend: function (xhr)
		    {
		       xhr.setRequestHeader('Authorization','BEARER '+localStorage.getItem('patient_token'));
		    },
			data: {email},
			success: function(data){
				dispatch({type: USER_PATIENT_API_DETAIL, payload: data});
				const dataEdit = {name: data.name, phone: data.client.phone, address: data.client.address, birthday: data.client.birthday};
				dispatch(userPatientEditLoad(dataEdit));
			},
			error: function(data){
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
			}
		});
	};
};

export const userPatientEditLoad = (detail) => {
	return {
		type: USER_PATIENT_EDIT_LOAD,
		payload: detail
	};
};

export const userPatientEditSubmit = (values) => {
	return (dispatch, getState) => {
		const params = {email: getState().patientAuth.email, params: values};
		$.ajax({
			url: `${API_URL}/client/edit`,
			type: 'POST',
			beforeSend: function (xhr)
		    {
		       xhr.setRequestHeader('Authorization','BEARER '+localStorage.getItem('patient_token'));
		    },
			data: params,
			success: function(data){
				toastr.success('Edit Patient Successfully');
				dispatch(push('/auth/client/dashboard'));
			},
			error: function(data){
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
			}
		});
	};
};