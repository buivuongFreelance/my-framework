import {
	USER_AUTH_SIGNIN,
	USER_AUTH_SIGNOUT
} from '../types/auth';

import {
	THEME_NO_ACTION
} from '../../theme/types';

import axios from 'axios';

export const userAuthAddToken = (token, user) => {
	localStorage.setItem('token', token);
	localStorage.setItem('user', JSON.stringify(user));
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return {
		type: THEME_NO_ACTION
	};
};

export const userAuthRemoveToken = () => {
	localStorage.setItem('token', '');
	localStorage.setItem('user', '');
	axios.defaults.headers.common['Authorization'] = `Bearer `;

	return {
		type: THEME_NO_ACTION
	};
};

export const userAuthSignIn = (user) => {
	return{
		type: USER_AUTH_SIGNIN,
		payload: user
	};
};

export const userAuthSignOut = () => {
	return{
		type: USER_AUTH_SIGNOUT,
		payload: false
	};
};