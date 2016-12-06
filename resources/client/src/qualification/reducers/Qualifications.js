import {
	QUALIFICATION_VIEW_LOAD_LIST_BY_DOCTOR,
	QUALIFICATION_VIEW_CLEAR,
	QUALIFICATION_VIEW_SELECTED
} from '../types/view';

const INITIAL_STATE = {list: [], selected: {}};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case QUALIFICATION_VIEW_LOAD_LIST_BY_DOCTOR:
			return {...state, list: payload.list};
		case QUALIFICATION_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case QUALIFICATION_VIEW_SELECTED:
			return {...state, selected: payload};
	}
	return state;
};