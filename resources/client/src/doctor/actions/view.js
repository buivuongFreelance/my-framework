import {
	DOCTOR_VIEW_LOAD_LIST,
	DOCTOR_VIEW_CLEAR,
	DOCTOR_VIEW_DETAIL,
	DOCTOR_VIEW_CHANGE_PAGE,
	DOCTOR_VIEW_TOGGLE_SEARCH,
	DOCTOR_VIEW_CHANGE_SEARCH,
	DOCTOR_VIEW_RESET_SEARCH
} from '../types/view';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';
import {GetTotalPages} from '../../common/helpers';

export const doctorViewLoadList = (offset, limit, search) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.doctor.view, {offset, limit, search})
				.then(response => {
					resolve(response.data);
					const payload = {
						list: response.data.list,
						totalPages: GetTotalPages(response.data.all)
					}
					dispatch({type: DOCTOR_VIEW_LOAD_LIST, payload: payload});
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

export const doctorViewClear = () => {
	return {
		type: DOCTOR_VIEW_CLEAR,
		payload: false
	};
};

export const doctorViewDetail = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.doctor.detail, {uid})
				.then(response => {
					resolve(response.data);
					dispatch({type: DOCTOR_VIEW_DETAIL, payload: response.data});
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

export const doctorViewChangePage = (page, offset) => {
	return {
		type: DOCTOR_VIEW_CHANGE_PAGE,
		payload: {page, offset}
	};
};

export const doctorViewToggleSearch = () => {
	return {
		type: DOCTOR_VIEW_TOGGLE_SEARCH,
		payload: true
	};
};

export const doctorViewChangeSearch = (field, value) => {
	return {
		type: DOCTOR_VIEW_CHANGE_SEARCH,
		payload: {field, value}
	};
};

export const doctorViewResetSearch = () => {
	return {
		type: DOCTOR_VIEW_RESET_SEARCH,
		payload: false
	};
};