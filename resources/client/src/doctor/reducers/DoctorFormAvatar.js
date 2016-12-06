import {
	DOCTOR_FORM_AVATAR_CHANGE,
	DOCTOR_FORM_AVATAR_CLEAR
} from '../types/formAvatar';

const fields = {avatar: null};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case DOCTOR_FORM_AVATAR_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case DOCTOR_FORM_AVATAR_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};