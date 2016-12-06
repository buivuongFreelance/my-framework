import {
	PAGE_VIEW_DETAIL,
	PAGE_VIEW_CLEAR
} from '../types/view';

const INITIAL_STATE = {name: '', seo_title: '', content: ''};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case PAGE_VIEW_DETAIL:
			return {...state, ...payload};
		case PAGE_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};