import {
	DOCTOR_VIEW_DETAIL
} from '../types/view';

import {DATE_NULL} from '../../common/config';
const INITIAL_STATE = {uid: '', email: '', user_uid: '', avatar: '', first_name: '', last_name: '', phone: '', address: '', job_title: '', description: '', birthday: ''};

export default (state = INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch(type){
		case DOCTOR_VIEW_DETAIL:
			return {...state, ...payload.doctor, email: payload.email};
	}
	return state;
};