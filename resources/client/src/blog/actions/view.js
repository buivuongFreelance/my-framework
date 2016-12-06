import {
	BLOG_VIEW_LOAD_LIST,
	BLOG_VIEW_CLEAR,
	BLOG_VIEW_DETAIL,
	BLOG_VIEW_CHANGE_PAGE,
	BLOG_VIEW_TOGGLE_SEARCH,
	BLOG_VIEW_CHANGE_SEARCH,
	BLOG_VIEW_RESET_SEARCH,
	BLOG_VIEW_SELECTED
} from '../types/view';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';
import {GetTotalPages} from '../../common/helpers';

export const blogViewLoadList = (offset, limit, search) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.blog.view, {offset, limit, search})
				.then(response => {
					resolve(response.data);
					const payload = {
						list: response.data.list,
						totalPages: GetTotalPages(response.data.all)
					}
					dispatch({type: BLOG_VIEW_LOAD_LIST, payload: payload});
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

export const blogViewClear = () => {
	return {
		type: BLOG_VIEW_CLEAR,
		payload: false
	};
};

export const blogViewDetail = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.blog.detail, {uid})
				.then(response => {
					resolve(response.data);
					dispatch({type: BLOG_VIEW_DETAIL, payload: response.data});
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

export const blogViewChangePage = (page, offset) => {
	return {
		type: BLOG_VIEW_CHANGE_PAGE,
		payload: {page, offset}
	};
};

export const blogViewToggleSearch = () => {
	return {
		type: BLOG_VIEW_TOGGLE_SEARCH,
		payload: true
	};
};

export const blogViewChangeSearch = (field, value) => {
	return {
		type: BLOG_VIEW_CHANGE_SEARCH,
		payload: {field, value}
	};
};

export const blogViewResetSearch = () => {
	return {
		type: BLOG_VIEW_RESET_SEARCH,
		payload: false
	};
};

export const blogViewSelected = (selected) => {
	return {
		type: BLOG_VIEW_SELECTED,
		payload: selected
	};
};

export const blogViewRemove = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.blog.remove, {uid})
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