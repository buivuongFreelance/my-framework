import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import UserFormSignIn from '../user/reducers/UserFormSignIn';
import Theme from '../theme/reducers';

const rootReducer = combineReducers({
	routing: routerReducer,
	userFormSignIn: UserFormSignIn,
	theme: Theme
});

export default rootReducer;