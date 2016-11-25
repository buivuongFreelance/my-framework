import {DEFAULT_DATE} from '../config';

export const GetFormValues = (values) => {
	let formArr = {};
	for(let field in values){
		const obj = values[field];
		if(field !== 'submitting' && field !== 'touched')
			formArr[field] = obj.value;
	}
	return formArr;
};

export const GetValidationField = (field, errors, reducer, state) => {
	let reducers = $.extend(true, {}, state[reducer]);
	let submitting = true;

	if(errors.length === 0)
		reducers[field] = {...reducers[field], valid: true, error: ''};
	else
		errors.map(error => {
			let valid = error.error?false:true;
			if(!valid) submitting = false;
			reducers[error.field] = {...reducers[error.field], valid, error: error.error};
		});

	if(submitting){
		for(let f in reducers){
			let reducer = reducers[f];
			if(f !== field && reducer !== true && reducer !== false){
				if(!reducer.valid){
					submitting = false;
				}
			}
		}
	}

	reducers.submitting = submitting;
	return reducers;
};

export const DisplayDate = (date) => {
	if(date == DEFAULT_DATE){
		return '';
	}
	if(is.empty(date))
		return '';
	if(typeof date === 'undefined')
		return '';

	date = date.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = dateArr[1];
	const day = dateArr[2];

	return day+'/'+month+'/'+year;
};