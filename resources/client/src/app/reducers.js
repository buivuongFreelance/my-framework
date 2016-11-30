import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import Theme from '../theme/reducers';

import UserFormSignIn from '../user/reducers/UserFormSignIn';
import UserAuth from '../user/reducers/UserAuth';

import DoctorFormNew from '../doctor/reducers/DoctorFormNew';

const rootReducer = combineReducers({
	userAuth: UserAuth,
	routing: routerReducer,
	userFormSignIn: UserFormSignIn,
	doctorFormNew: DoctorFormNew,
	theme: Theme
});

export default rootReducer;