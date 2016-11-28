import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {intlReducer} from 'react-intl-redux';

import UserFormSignIn from '../user/reducers/UserFormSignIn';
import UserFormSignUp from '../user/reducers/UserFormSignUp';

const rootReducer = combineReducers({
	routing: routerReducer,
	intl: intlReducer,
	userFormSignIn: UserFormSignIn,
	userFormSignUp: UserFormSignUp
});

export default rootReducer;