import {
	SERVICE_FORM_AVATAR_CHANGE,
	SERVICE_FORM_AVATAR_CLEAR
} from '../types/formAvatar';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const serviceFormAvatarChange = (field, value) => {
	return {
		type: SERVICE_FORM_AVATAR_CHANGE,
		payload: {field, value}
	};
};

export const serviceFormAvatarClear = () => {
	return {
		type: SERVICE_FORM_AVATAR_CLEAR,
		payload: false
	};
};

export const serviceFormAvatarUpload = (formData) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.service.upAvatar, formData)
				.then(response => {
					resolve(response.data);
					dispatch({type: THEME_NO_ACTION});
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