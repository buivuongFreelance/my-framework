import {ON_CHANGE_FIELD, ON_FOCUS_FIELD, ON_VALIDATION_FIELD} from '../types/FormTypes';

export const onChangeField = (field, value) => {
	return {
		type: ON_CHANGE_FIELD,
		payload: {field, value}
	};
};

export const onFocusField = () => {
	return {
		type: ON_FOCUS_FIELD,
		payload: true
	};
};

export const onValidationField = (field, error, fields, form) => {
	const valid = error.message ? false: true;
	let submitting = valid;
	const params = {error: error.message, valid};

	if(submitting){
		fields.map(f => {
			if(f !== field){
				if(!form[f].valid){
					submitting = false;
				}
			}
		});
	}

	let mainField = '';
	if(error.field !== field)
		mainField = error.field;

	return {
		type: ON_VALIDATION_FIELD,
		payload: {field, mainField, submitting, params}
	};
};