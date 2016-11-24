import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppComponent from './App';
import PatientRegistrationComponent from '../user/PatientRegistration';
import PatientLoginComponent from '../user/PatientLogin';

const routes = (
	<Route path="/" component={AppComponent}>
		<Route path="auth">
			<Route path="client">
				<Route path="registration" component={PatientRegistrationComponent}/>
				<Route path="login" component={PatientLoginComponent}/>
			</Route>
		</Route>
	</Route>
);

export default routes;