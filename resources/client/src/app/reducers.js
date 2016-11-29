import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import UserFormSignIn from '../user/reducers/UserFormSignIn';

const rootReducer = combineReducers({
	routing: routerReducer,
	userFormSignIn: UserFormSignIn
	/*intl: intlReducer,
	userFormSignIn: UserFormSignIn,
	userFormSignUp: UserFormSignUp,
	userAuth: UserAuth,
	theme: Theme*/
});

export default rootReducer;