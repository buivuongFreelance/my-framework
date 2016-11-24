import {
	THEME_CLICK_CLIENT_LOGIN,
	THEME_CLICK_CLIENT_REGISTRATION
} from '../types';
import {push} from 'react-router-redux';

export const themeClickClientLogin = () => {
	return (dispatch) => {
		dispatch(push('/auth/client/login'));
	};
};

export const themeClickClientRegistration = () => {
	return (dispatch) => {
		dispatch(push('/auth/client/registration'));
	};
};