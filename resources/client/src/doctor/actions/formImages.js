import {
	DOCTOR_FORM_IMAGES_CHANGE,
	DOCTOR_FORM_IMAGES_CLEAR,
	DOCTOR_FORM_IMAGES_FILL,
	DOCTOR_FORM_IMAGES_CHOOSE
} from '../types/formImages';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const doctorFormImagesChange = (field, value) => {
	return {
		type: DOCTOR_FORM_IMAGES_CHANGE,
		payload: {field, value}
	};
};

export const doctorFormImagesClear = () => {
	return {
		type: DOCTOR_FORM_IMAGES_CLEAR,
		payload: false
	};
};

export const doctorFormImagesUpload = (formData) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.doctor.upImage, formData)
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

export const doctorFormImagesFill = images => {
	return {
		type: DOCTOR_FORM_IMAGES_FILL,
		payload: images
	};
};

export const doctorFormImagesChoose = image => {
	return {
		type: DOCTOR_FORM_IMAGES_CHOOSE,
		payload: image
	};
};

export const doctorFormImagesRemove = uid => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.doctor.removeImage, {uid})
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