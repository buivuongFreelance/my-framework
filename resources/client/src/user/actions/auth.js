import {
	USER_AUTH_SIGNIN,
	USER_AUTH_SIGNOUT
} from '../types/auth';

import axios from 'axios';
import {push} from 'react-router-redux';

export const userAuthSignIn = (token, user) => {
	return dispatch => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));

		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		dispatch({
			type: USER_AUTH_SIGNIN,
			payload: user
		});
		dispatch(push('/auth/user/dashboard'));
	};
};

export const userAuthSignOut = () => {
	return dispatch => {
		localStorage.setItem('token', '');
		localStorage.setItem('user', '');
		axios.defaults.headers.common['Authorization'] = `Bearer `;

		dispatch({
			type: USER_AUTH_SIGNOUT,
			payload: false
		});

		dispatch(push('/auth/user/signin'));
		toastr.success('Logout User Successfully');
	};
};