import {
	USER_PATIENT_API_DETAIL
} from '../types';

const INITIAL_STATE = {client:{}};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case USER_PATIENT_API_DETAIL:
			return {...state, ...action.payload};
	}
	return state;
};