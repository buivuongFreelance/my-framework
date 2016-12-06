import {
	CAT_FAQ_VIEW_LOAD_LIST,
	CAT_FAQ_VIEW_CLEAR,
	CAT_FAQ_VIEW_DETAIL,
	CAT_FAQ_VIEW_CHANGE_PAGE,
	CAT_FAQ_VIEW_TOGGLE_SEARCH,
	CAT_FAQ_VIEW_CHANGE_SEARCH,
	CAT_FAQ_VIEW_RESET_SEARCH,
	CAT_FAQ_VIEW_SORT,
	CAT_FAQ_VIEW_SELECTED
} from '../types/view';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';
import {GetTotalPages} from '../../common/helpers';

export const catFaqViewLoadList = (offset, limit, search, sort) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.catFaq.view, {offset, limit, search, sort})
				.then(response => {
					resolve(response.data);
					const payload = {
						list: response.data.list,
						totalPages: GetTotalPages(response.data.all)
					}
					dispatch({type: CAT_FAQ_VIEW_LOAD_LIST, payload: payload});
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

export const catFaqViewClear = () => {
	return {
		type: CAT_FAQ_VIEW_CLEAR,
		payload: false
	};
};

export const catFaqViewDetail = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.catFaq.detail, {uid})
				.then(response => {
					resolve(response.data);
					dispatch({type: CAT_FAQ_VIEW_DETAIL, payload: response.data});
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

export const catFaqViewChangePage = (catFaq, offset) => {
	return {
		type: CAT_FAQ_VIEW_CHANGE_PAGE,
		payload: {catFaq, offset}
	};
};

export const catFaqViewToggleSearch = () => {
	return {
		type: CAT_FAQ_VIEW_TOGGLE_SEARCH,
		payload: true
	};
};

export const catFaqViewChangeSearch = (field, value) => {
	return {
		type: CAT_FAQ_VIEW_CHANGE_SEARCH,
		payload: {field, value}
	};
};

export const catFaqViewResetSearch = () => {
	return {
		type: CAT_FAQ_VIEW_RESET_SEARCH,
		payload: false
	};
};

export const catFaqViewSort = (field, value) => {
	return {
		type: CAT_FAQ_VIEW_SORT,
		payload: {field, value}
	};
};

export const catFaqViewSelected = (selected) => {
	return {
		type: CAT_FAQ_VIEW_SELECTED,
		payload: selected
	};
};

export const catFaqViewRemove = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.catFaq.remove, {uid})
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