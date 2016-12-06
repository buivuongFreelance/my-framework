import {
	SERVICE_FORM_IMAGES_CHANGE,
	SERVICE_FORM_IMAGES_CLEAR,
	SERVICE_FORM_IMAGES_FILL,
	SERVICE_FORM_IMAGES_CHOOSE
} from '../types/formImages';

import {THEME_NO_ACTION} from '../../theme/actions';

import axios from 'axios';
import {TIMEOUT} from '../../common/config';
import API from '../../common/config/api';

export const serviceFormImagesChange = (field, value) => {
	return {
		type: SERVICE_FORM_IMAGES_CHANGE,
		payload: {field, value}
	};
};

export const serviceFormImagesClear = () => {
	return {
		type: SERVICE_FORM_IMAGES_CLEAR,
		payload: false
	};
};

export const serviceFormImagesUpload = (formData) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.service.upImage, formData)
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

export const serviceFormImagesFill = images => {
	return {
		type: SERVICE_FORM_IMAGES_FILL,
		payload: images
	};
};

export const serviceFormImagesChoose = image => {
	return {
		type: SERVICE_FORM_IMAGES_CHOOSE,
		payload: image
	};
};

export const serviceFormImagesRemove = uid => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post(API.backend.service.removeImage, {uid})
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