import {
	SLIDESHOW_VIEW_LOAD_LIST,
	SLIDESHOW_VIEW_CLEAR,
	SLIDESHOW_VIEW_DETAIL,
	SLIDESHOW_VIEW_CHANGE_PAGE,
	SLIDESHOW_VIEW_TOGGLE_SEARCH,
	SLIDESHOW_VIEW_CHANGE_SEARCH,
	SLIDESHOW_VIEW_RESET_SEARCH,
	SLIDESHOW_VIEW_SORT,
	SLIDESHOW_VIEW_SELECTED
} from '../types/view';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';
import {GetTotalPages} from '../../common/helpers';

export const slideshowViewLoadList = (offset, limit, search, sort) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.slideshow.view, {offset, limit, search, sort})
				.then(response => {
					resolve(response.data);
					const payload = {
						list: response.data.list,
						totalPages: GetTotalPages(response.data.all)
					}
					dispatch({type: SLIDESHOW_VIEW_LOAD_LIST, payload: payload});
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

export const slideshowViewClear = () => {
	return {
		type: SLIDESHOW_VIEW_CLEAR,
		payload: false
	};
};

export const slideshowViewDetail = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.slideshow.detail, {uid})
				.then(response => {
					resolve(response.data);
					dispatch({type: SLIDESHOW_VIEW_DETAIL, payload: response.data});
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

export const slideshowViewChangePage = (slideshow, offset) => {
	return {
		type: SLIDESHOW_VIEW_CHANGE_PAGE,
		payload: {slideshow, offset}
	};
};

export const slideshowViewToggleSearch = () => {
	return {
		type: SLIDESHOW_VIEW_TOGGLE_SEARCH,
		payload: true
	};
};

export const slideshowViewChangeSearch = (field, value) => {
	return {
		type: SLIDESHOW_VIEW_CHANGE_SEARCH,
		payload: {field, value}
	};
};

export const slideshowViewResetSearch = () => {
	return {
		type: SLIDESHOW_VIEW_RESET_SEARCH,
		payload: false
	};
};

export const slideshowViewSort = (field, value) => {
	return {
		type: SLIDESHOW_VIEW_SORT,
		payload: {field, value}
	};
};

export const slideshowViewSelected = (selected) => {
	return {
		type: SLIDESHOW_VIEW_SELECTED,
		payload: selected
	};
};

export const slideshowViewRemove = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.slideshow.remove, {uid})
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