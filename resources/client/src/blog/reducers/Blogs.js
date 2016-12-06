import {
	BLOG_VIEW_LOAD_LIST,
	BLOG_VIEW_CLEAR,
	BLOG_VIEW_CHANGE_PAGE,
	BLOG_VIEW_TOGGLE_SEARCH,
	BLOG_VIEW_CHANGE_SEARCH,
	BLOG_VIEW_RESET_SEARCH,
	BLOG_VIEW_SELECTED
} from '../types/view';

import {DATA_LIMIT} from '../../common/config';

const pagination = {totalPages: 1, currentPage: 1, limit: parseInt(DATA_LIMIT), offset: 0, selected: null};
const search = {name: '', seo_title: ''};
const INITIAL_STATE = {list: [], pagination, search, displaySearch: false};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case BLOG_VIEW_LOAD_LIST:
			return {...state, list: payload.list, pagination: {...state.pagination, totalPages: payload.totalPages}};
		case BLOG_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
		case BLOG_VIEW_CHANGE_PAGE:
			return {...state, pagination: {...state.pagination, currentPage: payload.page, offset: payload.offset}};
		case BLOG_VIEW_TOGGLE_SEARCH:
			return {...state, displaySearch: !state.displaySearch};
		case BLOG_VIEW_CHANGE_SEARCH:
			return {...state, search: {...state.search, [payload.field]: payload.value}};
		case BLOG_VIEW_RESET_SEARCH:
			return {...state, search: {...search}};
		case BLOG_VIEW_SELECTED:
			return {...state, selected: payload};
	}
	return state;
};