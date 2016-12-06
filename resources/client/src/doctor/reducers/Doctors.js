import {
	DOCTOR_VIEW_LOAD_LIST,
	DOCTOR_VIEW_CLEAR,
	DOCTOR_VIEW_CHANGE_PAGE,
	DOCTOR_VIEW_TOGGLE_SEARCH,
	DOCTOR_VIEW_CHANGE_SEARCH,
	DOCTOR_VIEW_RESET_SEARCH
} from '../types/view';

import {DATA_LIMIT} from '../../common/config';

const pagination = {totalPages: 1, currentPage: 1, limit: parseInt(DATA_LIMIT), offset: 0};
const search = {first_name: '', last_name: '', email: ''};
const INITIAL_STATE = {list: [], pagination, search, displaySearch: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case DOCTOR_VIEW_LOAD_LIST:
			return {...state, list: payload.list, pagination: {...state.pagination, totalPages: payload.totalPages}};
		case DOCTOR_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case DOCTOR_VIEW_CHANGE_PAGE:
			return {...state, pagination: {...state.pagination, currentPage: payload.page, offset: payload.offset}};
		case DOCTOR_VIEW_TOGGLE_SEARCH:
			return {...state, displaySearch: !state.displaySearch};
		case DOCTOR_VIEW_CHANGE_SEARCH:
			return {...state, search: {...state.search, [payload.field]: payload.value}};
		case DOCTOR_VIEW_RESET_SEARCH:
			return {...state, search: {...search}};
	}
	return state;
};