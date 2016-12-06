import React from 'react';
import {Route, IndexRoute} from 'react-router';
import BackendComponent from './Backend';
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
import DoctorEditImagesComponent from '../doctor/DoctorEditImages';
import DoctorEditQualificationsComponent from '../doctor/DoctorEditQualifications';

import PageViewComponent from '../page/PageView';
import PageNewComponent from '../page/PageNew';
import PageEditComponent from '../page/PageEdit';

import ServiceViewComponent from '../service/ServiceView';
import ServiceNewComponent from '../service/ServiceNew';
import ServiceEditAvatarComponent from '../service/ServiceEditAvatar';
import ServiceEditInfoComponent from '../service/ServiceEditInfo';
import ServiceEditImagesComponent from '../service/ServiceEditImages';

import BlogViewComponent from '../blog/BlogView';
import BlogNewComponent from '../blog/BlogNew';
import BlogEditAvatarComponent from '../blog/BlogEditAvatar';
import BlogEditInfoComponent from '../blog/BlogEditInfo';

import CatFaqViewComponent from '../catFaq/CatFaqView';
import CatFaqNewComponent from '../catFaq/CatFaqNew';
import CatFaqEditComponent from '../catFaq/CatFaqEdit';

import SiteViewComponent from '../site/SiteView';
import SiteSocialComponent from '../site/SiteSocial';

import SlideshowViewComponent from '../slideshow/SlideshowView';
import SlideshowNewComponent from '../slideshow/SlideshowNew';
import SlideshowEditComponent from '../slideshow/SlideshowEdit';

/* FRONT END */
import AppFrontendComponent from '../FRONTEND/app/App';
import HomepageComponent from '../FRONTEND/homepage/home';
/* END FRONT END */

const routes = (
	<Route component={AppComponent}>
		<IndexRoute component={AppFrontendComponent}/>
		<Route component={AppFrontendComponent}>
			<Route path={Routes.frontend.homepage} component={HomepageComponent}/>
		</Route>
		<Route path="backend" component={BackendComponent}>
			<Route path={Routes.backend.signin} component={BackendUserAuthHoc(UserBackendSignInComponent)}/>
			<Route path={Routes.backend.dashboard} component={BackendUserAuthHoc(DashboardViewComponent)}/>

			<Route path={Routes.backend.doctorList} component={BackendUserAuthHoc(DoctorViewComponent)}/>
			<Route path={Routes.backend.doctorNew} component={BackendUserAuthHoc(DoctorNewComponent)}/>
			<Route path={Routes.backend.doctorEditAvatar} component={BackendUserAuthHoc(DoctorEditAvatarComponent)}/>
			<Route path={Routes.backend.doctorEditInfo} component={BackendUserAuthHoc(DoctorEditInfoComponent)}/>
			<Route path={Routes.backend.doctorEditImages} component={BackendUserAuthHoc(DoctorEditImagesComponent)}/>
			<Route path={Routes.backend.doctorEditQualifications} component={BackendUserAuthHoc(DoctorEditQualificationsComponent)}/>

			<Route path={Routes.backend.pageList} component={BackendUserAuthHoc(PageViewComponent)}/>
			<Route path={Routes.backend.pageNew} component={BackendUserAuthHoc(PageNewComponent)}/>
			<Route path={Routes.backend.pageEdit} component={BackendUserAuthHoc(PageEditComponent)}/>
			<Route path={Routes.backend.serviceList} component={BackendUserAuthHoc(ServiceViewComponent)}/>
			<Route path={Routes.backend.serviceNew} component={BackendUserAuthHoc(ServiceNewComponent)}/>
			<Route path={Routes.backend.serviceEditAvatar} component={BackendUserAuthHoc(ServiceEditAvatarComponent)}/>
			<Route path={Routes.backend.serviceEditInfo} component={BackendUserAuthHoc(ServiceEditInfoComponent)}/>
			<Route path={Routes.backend.serviceEditImages} component={BackendUserAuthHoc(ServiceEditImagesComponent)}/>

			<Route path={Routes.backend.blogList} component={BackendUserAuthHoc(BlogViewComponent)}/>
			<Route path={Routes.backend.blogNew} component={BackendUserAuthHoc(BlogNewComponent)}/>
			<Route path={Routes.backend.blogEditAvatar} component={BackendUserAuthHoc(BlogEditAvatarComponent)}/>
			<Route path={Routes.backend.blogEditInfo} component={BackendUserAuthHoc(BlogEditInfoComponent)}/>
			
			<Route path={Routes.backend.catFaqList} component={BackendUserAuthHoc(CatFaqViewComponent)}/>
			<Route path={Routes.backend.catFaqNew} component={BackendUserAuthHoc(CatFaqNewComponent)}/>
			<Route path={Routes.backend.catFaqEdit} component={BackendUserAuthHoc(CatFaqEditComponent)}/>

			<Route path={Routes.backend.siteView} component={BackendUserAuthHoc(SiteViewComponent)}/>
			<Route path={Routes.backend.siteSocial} component={BackendUserAuthHoc(SiteSocialComponent)}/>

			<Route path={Routes.backend.slideshowList} component={BackendUserAuthHoc(SlideshowViewComponent)}/>
			<Route path={Routes.backend.slideshowNew} component={BackendUserAuthHoc(SlideshowNewComponent)}/>
			<Route path={Routes.backend.slideshowEdit} component={BackendUserAuthHoc(SlideshowEditComponent)}/>
		</Route>
	</Route>
);

export default routes;