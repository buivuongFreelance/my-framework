import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import PatientRegistrationFormReducer from '../user/reducers/PatientRegistrationFormReducer';
import PatientLoginFormReducer from '../user/reducers/PatientLoginFormReducer';
import PatientEditFormReducer from '../user/reducers/PatientEditFormReducer';
import PatientAuthReducer from '../user/reducers/PatientAuthReducer';
import PatientReducer from '../user/reducers/PatientReducer';
import {intlReducer} from 'react-intl-redux';

const rootReducer = combineReducers({
	routing: routerReducer,
	patientRegistrationForm: PatientRegistrationFormReducer,
	patientLoginForm: PatientLoginFormReducer,
	patientEditForm: PatientEditFormReducer,
	patientAuth: PatientAuthReducer,
	patient: PatientReducer,
	intl: intlReducer
});

export default rootReducer;