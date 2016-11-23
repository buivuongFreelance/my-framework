import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {DEFAULT_URL} from '../common/config';
import AppComponent from './App';
import LoginComponent from '../user/Login';
import PatientRegistrationComponent from '../user/PatientRegistration';

const routes = (
	<Route path={DEFAULT_URL} component={AppComponent}>
		<Route path="auth">
			<Route path="login" component={LoginComponent}/>
			<Route path="patient">
				<Route path="registration" component={PatientRegistrationComponent}/>
			</Route>
		</Route>
	</Route>
);

export default routes;