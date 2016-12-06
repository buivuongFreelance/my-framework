import {
	SERVICE_VIEW_LOAD_LIST,
	SERVICE_VIEW_CLEAR,
	SERVICE_VIEW_DETAIL,
	SERVICE_VIEW_CHANGE_PAGE,
	SERVICE_VIEW_TOGGLE_SEARCH,
	SERVICE_VIEW_CHANGE_SEARCH,
	SERVICE_VIEW_RESET_SEARCH,
	SERVICE_VIEW_SELECTED
} from '../types/view';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';
import {GetTotalPages} from '../../common/helpers';

export const serviceViewLoadList = (offset, limit, search) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.service.view, {offset, limit, search})
				.then(response => {
					resolve(response.data);
					const payload = {
						list: response.data.list,
						totalPages: GetTotalPages(response.data.all)
					}
					dispatch({type: SERVICE_VIEW_LOAD_LIST, payload: payload});
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

export const serviceViewClear = () => {
	return {
		type: SERVICE_VIEW_CLEAR,
		payload: false
	};
};

export const serviceViewDetail = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.service.detail, {uid})
				.then(response => {
					resolve(response.data);
					dispatch({type: SERVICE_VIEW_DETAIL, payload: response.data});
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

export const serviceViewChangePage = (page, offset) => {
	return {
		type: SERVICE_VIEW_CHANGE_PAGE,
		payload: {page, offset}
	};
};

export const serviceViewToggleSearch = () => {
	return {
		type: SERVICE_VIEW_TOGGLE_SEARCH,
		payload: true
	};
};

export const serviceViewChangeSearch = (field, value) => {
	return {
		type: SERVICE_VIEW_CHANGE_SEARCH,
		payload: {field, value}
	};
};

export const serviceViewResetSearch = () => {
	return {
		type: SERVICE_VIEW_RESET_SEARCH,
		payload: false
	};
};

export const serviceViewSelected = (selected) => {
	return {
		type: SERVICE_VIEW_SELECTED,
		payload: selected
	};
};

export const serviceViewRemove = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.service.remove, {uid})
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