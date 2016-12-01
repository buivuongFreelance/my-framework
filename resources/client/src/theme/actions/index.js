import {
	THEME_NO_ACTION
} from '../types';

import Block from '../../common/components/block';

export const themeShowLoadingEl = (element) => {
	Block.show(element);
	return {
		type: THEME_NO_ACTION
	};
};

export const themeHideLoadingEl = (element) => {
	Block.hide(element);
	return {
		type: THEME_NO_ACTION
	};
};

export const themeShowSuccess = (message) => {
	toastr.success(message);
	return {
		type: THEME_NO_ACTION
	};
};

export const themeShowError = (message) => {
	toastr.error(message);
	return {
		type: THEME_NO_ACTION
	};
};

export const themeAddBodyLogin = () => {
	$('body').addClass('login');
	return {
		type: THEME_NO_ACTION
	};
};

export const themeRemoveBodyLogin = () => {
	$('body').removeClass('login');
	return {
		type: THEME_NO_ACTION
	};
};

export const themeAddBodyMain = () => {
	$('body').addClass('page-container-bg-solid');
	return {
		type: THEME_NO_ACTION
	};
};

export const themeRemoveBodyMain = () => {
	$('body').removeClass('page-container-bg-solid');
	return {
		type: THEME_NO_ACTION
	};
};

export const themeAddTabActive = (element) => {
	$(element).addClass('active');
	return {
		type: THEME_NO_ACTION
	};
};