import {
	THEME_CLICK_CLIENT_LOGIN,
	THEME_CLICK_CLIENT_REGISTRATION,
	THEME_CLICK_CLIENT_LOGOUT,
	THEME_CLICK_CLIENT_EDIT
} from '../types';
import {push} from 'react-router-redux';
import {UserActions} from '../../user';

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

export const themeClickClientEdit = () => {
	return (dispatch) => {
		dispatch(push('/auth/client/edit'));
	};
};

export const themeClickClientView = () => {
	return (dispatch) => {
		dispatch(push('/auth/client/dashboard'));
	};
};

export const themeClickClientLogout = () => {
	return (dispatch) => {
		dispatch(UserActions.userPatientAuthLogout());
	};
};