import {
	DOCTOR_FORM_AVATAR_CHANGE
} from '../types/formAvatar';

const fields = {avatar: ''};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case DOCTOR_FORM_AVATAR_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
	}
	return state;
};