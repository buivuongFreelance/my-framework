import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppComponent from './App';

import UserSignInComponent from '../user/UserSignIn';
import UserSignUpComponent from '../user/UserSignUp';
import UserForgotPasswordComponent from '../user/UserForgotPassword';
import UserChangePasswordComponent from '../user/UserChangePassword';

//import PatientRegistrationComponent from '../user/PatientRegistration';
//import UserSignInComponent from '../user/UserSignIn';
//import PatientViewComponent from '../user/PatientView';
//import PatientEditComponent from '../user/PatientEdit';

//import PatientAuthHoc from '../common/hoc/PatientAuth';

/*const routes = (
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
				<Route path="signin" component={UserSignInComponent}/>
			</Route>
		</Route>
	</Route>
);*/

const routes = (
	<Route path="/" component={AppComponent}>
		<Route path="auth">
			<Route path="user">
				<Route path="signin" component={UserSignInComponent}/>
				<Route path="signup" component={UserSignUpComponent}/>
				<Route path="forgotPassword" component={UserForgotPasswordComponent}/>
				<Route path="changePassword" component={UserChangePasswordComponent}/>
			</Route>
		</Route>
	</Route>
);

export default routes;