import {SUBMIT_PATIENT_REGISTRATION} from './PatientRegistrationTypes';
import {API_URL} from '../common/config';
import {push} from 'react-router-redux';

export const submitPatientRegistration = (values) => {
	return (dispatch, getState) => {
		$.post(`${API_URL}/authenticate/client/register`, values, data => {
			toastr.success('Register Successfully');
			dispatch(push('/my-framework/public'));
		});
	};
};