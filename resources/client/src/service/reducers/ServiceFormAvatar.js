import {
	SERVICE_FORM_AVATAR_CHANGE,
	SERVICE_FORM_AVATAR_CLEAR
} from '../types/formAvatar';

const fields = {avatar: null};
const INITIAL_STATE = {values: fields, errors: fields, touched: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case SERVICE_FORM_AVATAR_CHANGE:
			return {...state, values: {...state.values, [payload.field]: payload.value}};
		case SERVICE_FORM_AVATAR_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};