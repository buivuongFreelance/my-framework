import {
	SITE_VIEW_DETAIL,
	SITE_VIEW_CLEAR
} from '../types/view';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const siteViewDetail = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.site.detail)
				.then(response => {
					resolve(response.data);
					dispatch({type: SITE_VIEW_DETAIL, payload: response.data});
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

export const siteViewClear = () => {
	return {
		type: SITE_VIEW_CLEAR,
		payload: false
	};
};