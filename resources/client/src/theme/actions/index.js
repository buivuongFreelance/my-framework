import {
	THEME_CONFIRM_SHOW,
	THEME_CONFIRM_HIDE,
	THEME_CONFIRM_ACCEPT,
	THEME_CONFIRM_REJECT
} from '../types';

export const themeConfirmShow = () => {
	return {
		type: THEME_CONFIRM_SHOW,
		payload: true
	};
};

export const themeConfirmHide = () => {
	return {
		type: THEME_CONFIRM_HIDE,
		payload: false
	};
};

export const themeConfirmAccept = () => {
	return {
		type: THEME_CONFIRM_ACCEPT,
		payload: true
	};
};

export const themeConfirmAccept = () => {
	return {
		type: THEME_CONFIRM_REJECT,
		payload: false
	};
};