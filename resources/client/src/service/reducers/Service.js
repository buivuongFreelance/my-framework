import {
	SERVICE_VIEW_DETAIL,
	SERVICE_VIEW_CLEAR
} from '../types/view';

const INITIAL_STATE = {uid: '', name: '', description: '', content: '' , avatar: ''};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case SERVICE_VIEW_DETAIL:
			return {...state, ...payload};
		case SERVICE_VIEW_CLEAR:
			return {...state, ...INITIAL_STATE};
	}
	return state;
};