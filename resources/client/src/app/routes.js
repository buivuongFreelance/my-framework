import React from 'react';
import {Route} from 'react-router';
import AppComponent from './App';
import Routes from '../common/config/routes';

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
import BackendUserAuthHoc from '../common/hoc/BackendUserAuth';

import UserBackendSignInComponent from '../user/UserBackendSignIn';
import DashboardViewComponent from '../dashboard/DashboardView';
import DoctorViewComponent from '../doctor/DoctorView';
import DoctorNewComponent from '../doctor/DoctorNew';
import DoctorEditAvatarComponent from '../doctor/DoctorEditAvatar';
import DoctorEditInfoComponent from '../doctor/DoctorEditInfo';

const routes = (
	<Route path="/" component={AppComponent}>
		<Route path="backend">
			<Route path={Routes.backend.signin} component={BackendUserAuthHoc(UserBackendSignInComponent)}/>
			<Route path={Routes.backend.dashboard} component={BackendUserAuthHoc(DashboardViewComponent)}/>
			<Route path={Routes.backend.doctorList} component={BackendUserAuthHoc(DoctorViewComponent)}/>
			<Route path={Routes.backend.doctorNew} component={BackendUserAuthHoc(DoctorNewComponent)}/>
			<Route path={Routes.backend.doctorEditAvatar} component={BackendUserAuthHoc(DoctorEditAvatarComponent)}/>
			<Route path={Routes.backend.doctorEditInfo} component={BackendUserAuthHoc(DoctorEditInfoComponent)}/>
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