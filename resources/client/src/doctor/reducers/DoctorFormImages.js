import {
	DOCTOR_FORM_IMAGES_CHANGE,
	DOCTOR_FORM_IMAGES_CLEAR,
	DOCTOR_FORM_IMAGES_FILL,
	DOCTOR_FORM_IMAGES_CHOOSE
} from '../types/formImages';

const fields = {images: []};
const INITIAL_STATE = {values: fields, errors: fields, touched: false, image: null};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case DOCTOR_FORM_IMAGES_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case DOCTOR_FORM_IMAGES_CLEAR:
			return {...state, ...INITIAL_STATE};
		case DOCTOR_FORM_IMAGES_FILL:
			return {...state, values: {...state.values, images: payload}};
		case DOCTOR_FORM_IMAGES_CHOOSE:
			return {...state, image: payload};
	}
	return state;
};