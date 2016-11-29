import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppComponent from './App';

/*import UserSignInComponent from '../user/UserSignIn';
import UserSignUpComponent from '../user/UserSignUp';
import UserForgotPasswordComponent from '../user/UserForgotPassword';
import UserChangePasswordComponent from '../user/UserChangePassword';
import UserDashboardComponent from '../user/UserDashboard';

import UserAuthHoc from '../common/hoc/UserAuth';

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
				<Route path="signin" component={UserSignInComponent}/>
			</Route>
		</Route>
	</Route>
);*/

import UserBackendSignInComponent from '../user/UserBackendSignIn';

const routes = (
	<Route path="/" component={AppComponent}>
		<Route path="backend">
			<IndexRoute component={UserBackendSignInComponent}/>
			<Route path="auth/user/signin" component={UserBackendSignInComponent}/>
		</Route>
		{/*<Route path="auth">
			<Route path="user">
				<Route path="signin" component={UserAuthHoc(UserSignInComponent)}/>
				<Route path="signup" component={UserAuthHoc(UserSignUpComponent)}/>
				<Route path="forgotPassword" component={UserAuthHoc(UserForgotPasswordComponent)}/>
				<Route path="changePassword" component={UserAuthHoc(UserChangePasswordComponent)}/>
				<Route path="dashboard" component={UserAuthHoc(UserDashboardComponent)}/>
			</Route>
		</Route>*/}
	</Route>
);

export default routes;