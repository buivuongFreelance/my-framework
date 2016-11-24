import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import PatientRegistrationFormReducer from '../user/reducers/PatientRegistrationFormReducer';
import PatientLoginFormReducer from '../user/reducers/PatientLoginFormReducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	patientRegistrationForm: PatientRegistrationFormReducer,
	patientLoginForm: PatientLoginFormReducer
});

export default rootReducer;