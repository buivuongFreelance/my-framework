import {
	DOCTOR_FORM_AVATAR_CHANGE,
	DOCTOR_FORM_AVATAR_CLEAR
} from '../types/formAvatar';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const doctorFormAvatarChange = (field, value) => {
	return {
		type: DOCTOR_FORM_AVATAR_CHANGE,
		payload: {field, value}
	};
};

export const doctorFormAvatarClear = () => {
	return {
		type: DOCTOR_FORM_AVATAR_CLEAR,
		payload: false
	};
};

export const doctorFormAvatarUpload = (formData) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.doctor.upAvatar, formData)
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