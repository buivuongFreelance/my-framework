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