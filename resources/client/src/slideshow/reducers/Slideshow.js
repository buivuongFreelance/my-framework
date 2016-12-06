import {
	SLIDESHOW_VIEW_DETAIL,
	SLIDESHOW_VIEW_CLEAR
} from '../types/view';

const INITIAL_STATE = {avatar: null};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case SLIDESHOW_VIEW_DETAIL:
			return {...state, ...payload};
		case SLIDESHOW_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};