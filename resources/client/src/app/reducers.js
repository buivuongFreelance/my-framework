import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import Theme from '../theme/reducers';

import UserFormSignIn from '../user/reducers/UserFormSignIn';
import UserAuth from '../user/reducers/UserAuth';

import Doctors from '../doctor/reducers/Doctors';
import Doctor from '../doctor/reducers/Doctor';
import DoctorFormNew from '../doctor/reducers/DoctorFormNew';
import DoctorFormAvatar from '../doctor/reducers/DoctorFormAvatar';

const rootReducer = combineReducers({
	routing: routerReducer,
	theme: Theme,
	userAuth: UserAuth,
	userFormSignIn: UserFormSignIn,
	doctors: Doctors,
	doctor: Doctor,
	doctorFormNew: DoctorFormNew,
	doctorFormAvatar: DoctorFormAvatar
});

export default rootReducer;