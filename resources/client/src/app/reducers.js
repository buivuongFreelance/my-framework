import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import themeReducer from '../theme/ThemeReducer';
import LoginFormReducer from '../user/LoginFormReducer';
import PatientRegistrationFormReducer from '../user/PatientRegistrationFormReducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	theme: themeReducer,
	loginForm: LoginFormReducer,
	patientRegistrationForm: PatientRegistrationFormReducer
});

export default rootReducer;