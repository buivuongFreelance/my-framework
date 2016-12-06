import {
	QUALIFICATION_VIEW_LOAD_LIST_BY_DOCTOR,
	QUALIFICATION_VIEW_CLEAR,
	QUALIFICATION_VIEW_DETAIL,
	QUALIFICATION_VIEW_SELECTED
} from '../types/view';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';
import {GetTotalPages} from '../../common/helpers';

export const qualificationViewLoadListByDoctor = (user_uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.qualification.viewByDoctor, {user_uid})
				.then(response => {
					resolve(response.data);
					const payload = {
						list: response.data.list
					}
					dispatch({type: QUALIFICATION_VIEW_LOAD_LIST_BY_DOCTOR, payload: payload});
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

export const qualificationViewClear = () => {
	return {
		type: QUALIFICATION_VIEW_CLEAR,
		payload: false
	};
};

export const qualificationViewDetail = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.qualification.detail, {uid})
				.then(response => {
					resolve(response.data);
					dispatch({type: QUALIFICATION_VIEW_DETAIL, payload: response.data});
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

export const qualificationViewSelected = (selected) => {
	return {
		type: QUALIFICATION_VIEW_SELECTED,
		payload: selected
	};
};

export const qualificationViewRemove = (uid) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.qualification.remove, {uid})
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