import {
	DOCTOR_FORM_NEW_FOCUS,
	DOCTOR_FORM_NEW_CHANGE,
	DOCTOR_FORM_NEW_VALIDATION
} from '../types/formNew';

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