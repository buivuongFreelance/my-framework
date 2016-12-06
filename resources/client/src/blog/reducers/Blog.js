import {
	BLOG_VIEW_DETAIL,
	BLOG_VIEW_CLEAR
} from '../types/view';

const INITIAL_STATE = {uid: '', name: '', description: '', content: '' , avatar: '', seo_title: ''};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case BLOG_VIEW_DETAIL:
			return {...state, ...payload};
		case BLOG_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};