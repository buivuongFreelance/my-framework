import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppComponent from './App';

//import PatientRegistrationComponent from '../user/PatientRegistration';
//import UserSignInComponent from '../user/UserSignIn';
//import PatientViewComponent from '../user/PatientView';
//import PatientEditComponent from '../user/PatientEdit';

//import PatientAuthHoc from '../common/hoc/PatientAuth';

const routes = (
	<Route path="/" component={AppComponent}>
		<Route path="auth">
			<Route path="user">
				<Route path="registration" 
					getComponent={(location, callback) => {
						require.ensure([], (require) => {
					    	callback(null, require('../user/PatientRegistration.js').default)
					    });
					}}
				/>
				<Route path="login" 
					getComponent={(location, callback) => {
						require.ensure([], (require) => {
					    	callback(null, require('../user/UserSignIn.js').default)
					    });
					}}
				/>
			</Route>
		</Route>
	</Route>
);

export default routes;