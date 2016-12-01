import {
	DOCTOR_VIEW_LOAD_LIST
} from '../types/view';

const INITIAL_STATE = {list: []};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case DOCTOR_VIEW_LOAD_LIST:
			return {...state, list: payload};
	}
	return state;
};