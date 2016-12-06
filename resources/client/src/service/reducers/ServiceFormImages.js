import {
	SERVICE_FORM_IMAGES_CHANGE,
	SERVICE_FORM_IMAGES_CLEAR,
	SERVICE_FORM_IMAGES_FILL,
	SERVICE_FORM_IMAGES_CHOOSE
} from '../types/formImages';

const fields = {images: []};
const INITIAL_STATE = {values: fields, errors: fields, touched: false, image: null};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case SERVICE_FORM_IMAGES_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case SERVICE_FORM_IMAGES_CLEAR:
			return {...state, ...INITIAL_STATE};
		case SERVICE_FORM_IMAGES_FILL:
			return {...state, values: {...state.values, images: payload}};
		case SERVICE_FORM_IMAGES_CHOOSE:
			return {...state, image: payload};
	}
	return state;
};