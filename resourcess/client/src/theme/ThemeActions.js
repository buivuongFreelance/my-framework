import {BODY_LOGIN_SHOW, BODY_LOGIN_HIDE} from './ThemeTypes';

export const showLoginBody = () => {
	$('body').addClass('login');
	return {
		type: BODY_LOGIN_SHOW,
		payload: true
	};
};

export const hideLoginBody = () => {
	$('body').removeClass('login');
	return {
		type: BODY_LOGIN_HIDE,
		payload: false
	};
};