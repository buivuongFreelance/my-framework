import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppComponent from './App';

import PatientRegistrationComponent from '../user/PatientRegistration';
import PatientLoginComponent from '../user/PatientLogin';
import PatientViewComponent from '../user/PatientView';
import PatientEditComponent from '../user/PatientEdit';

import PatientAuthHoc from '../common/hoc/PatientAuth';

const routes = (
	<Route path="/" component={AppComponent}>
		<Route path="auth">
			<Route path="client">
				<Route path="registration" component={PatientAuthHoc(PatientRegistrationComponent)}/>
				<Route path="login" component={PatientAuthHoc(PatientLoginComponent)}/>
				<Route path="dashboard" component={PatientAuthHoc(PatientViewComponent)}/>
				<Route path="edit" component={PatientAuthHoc(PatientEditComponent)}/>
			</Route>
		</Route>
	</Route>
);

export default routes;