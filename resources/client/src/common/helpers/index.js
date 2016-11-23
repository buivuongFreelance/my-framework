export const GetFormValues = (values) => {
	let formArr = {};
	for(let field in values){
		const obj = values[field];
		if(field !== 'submitting' && field !== 'touched')
			formArr[field] = obj.value;
	}
	return formArr;
};