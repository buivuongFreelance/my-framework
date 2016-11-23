const logger = store => next => action => {
	const findForm = action.type.indexOf('_field');

	let result = next(action);
	if(findForm === -1){
		console.group(action.type);
		console.info('dispatching', action);
		console.log('next state', store.getState());
		console.groupEnd(action.type);
	}

	return result;
}

export default logger;