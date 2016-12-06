import {
	CAT_FAQ_VIEW_LOAD_LIST,
	CAT_FAQ_VIEW_CLEAR,
	CAT_FAQ_VIEW_CHANGE_PAGE,
	CAT_FAQ_VIEW_TOGGLE_SEARCH,
	CAT_FAQ_VIEW_CHANGE_SEARCH,
	CAT_FAQ_VIEW_RESET_SEARCH,
	CAT_FAQ_VIEW_SORT,
	CAT_FAQ_VIEW_SELECTED
} from '../types/view';

import {DATA_LIMIT} from '../../common/config';

const pagination = {totalPages: 1, currentPage: 1, limit: parseInt(DATA_LIMIT), offset: 0};
const search = {name: ''};
const sort = {field: 'created_at', value: 'desc'};
const INITIAL_STATE = {list: [], pagination, search, sort, displaySearch: false, selected: null};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case CAT_FAQ_VIEW_LOAD_LIST:
			return {...state, list: payload.list, pagination: {...state.pagination, totalPages: payload.totalPages}};
		case CAT_FAQ_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case CAT_FAQ_VIEW_CHANGE_PAGE:
			return {...state, pagination: {...state.pagination, currentPage: payload.page, offset: payload.offset}};
		case CAT_FAQ_VIEW_TOGGLE_SEARCH:
			return {...state, displaySearch: !state.displaySearch};
		case CAT_FAQ_VIEW_CHANGE_SEARCH:
			return {...state, search: {...state.search, [payload.field]: payload.value}};
		case CAT_FAQ_VIEW_RESET_SEARCH:
			return {...state, search: {...search}};
		case CAT_FAQ_VIEW_SORT:
			return {...state, sort: {field: payload.field, value: payload.value}};
		case CAT_FAQ_VIEW_SELECTED:
			return {...state, selected: payload};
	}
	return state;
};