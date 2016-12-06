import {
	PAGE_VIEW_LOAD_LIST,
	PAGE_VIEW_CLEAR,
	PAGE_VIEW_DETAIL,
	PAGE_VIEW_CHANGE_PAGE,
	PAGE_VIEW_TOGGLE_SEARCH,
	PAGE_VIEW_CHANGE_SEARCH,
	PAGE_VIEW_RESET_SEARCH,
	PAGE_VIEW_SORT,
	PAGE_VIEW_SELECTED
} from '../types/view';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';
import {GetTotalPages} from '../../common/helpers';

export const pageViewLoadList = (offset, limit, search, sort) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.page.view, {offset, limit, search, sort})
				.then(response => {
					resolve(response.data);
					const payload = {
						list: response.data.list,
						totalPages: GetTotalPages(response.data.all)
					}
					dispatch({type: PAGE_VIEW_LOAD_LIST, payload: payload});
				})
				.catch(error => {
					if(error.response){
						let message = '';
						if(error.response.status === 401){
							const errors = error.response.data;
							for(let field in errors)
								message = errors[field][0];
						}else
							message = error.response.data.message;
						reject(message);
					}
				});
			}, TIMEOUT);
		});
	};
};

export const pageViewClear = () => {
	return {
		type: PAGE_VIEW_CLEAR,
		payload: false
	};
};

export const pageViewDetail = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.page.detail, {uid})
				.then(response => {
					resolve(response.data);
					dispatch({type: PAGE_VIEW_DETAIL, payload: response.data});
				})
				.catch(error => {
					if(error.response){
						let message = '';
						if(error.response.status === 401){
							const errors = error.response.data;
							for(let field in errors)
								message = errors[field][0];
						}else
							message = error.response.data.message;
						reject(message);
					}
				});
			}, TIMEOUT);
		});
	};
};

export const pageViewChangePage = (page, offset) => {
	return {
		type: PAGE_VIEW_CHANGE_PAGE,
		payload: {page, offset}
	};
};

export const pageViewToggleSearch = () => {
	return {
		type: PAGE_VIEW_TOGGLE_SEARCH,
		payload: true
	};
};

export const pageViewChangeSearch = (field, value) => {
	return {
		type: PAGE_VIEW_CHANGE_SEARCH,
		payload: {field, value}
	};
};

export const pageViewResetSearch = () => {
	return {
		type: PAGE_VIEW_RESET_SEARCH,
		payload: false
	};
};

export const pageViewSort = (field, value) => {
	return {
		type: PAGE_VIEW_SORT,
		payload: {field, value}
	};
};

export const pageViewSelected = (selected) => {
	return {
		type: PAGE_VIEW_SELECTED,
		payload: selected
	};
};

export const pageViewRemove = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.page.remove, {uid})
				.then(response => {
					resolve(response.data);
					dispatch({type: THEME_NO_ACTION, payload: response.data});
				})
				.catch(error => {
					if(error.response){
						let message = '';
						if(error.response.status === 401){
							const errors = error.response.data;
							for(let field in errors)
								message = errors[field][0];
						}else
							message = error.response.data.message;
						reject(message);
					}
				});
			}, TIMEOUT);
		});
	};
};