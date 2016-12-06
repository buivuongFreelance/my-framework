import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import Theme from '../theme/reducers';

import UserFormSignIn from '../user/reducers/UserFormSignIn';
import UserAuth from '../user/reducers/UserAuth';

import Doctors from '../doctor/reducers/Doctors';
import Doctor from '../doctor/reducers/Doctor';
import DoctorFormNew from '../doctor/reducers/DoctorFormNew';
import DoctorFormAvatar from '../doctor/reducers/DoctorFormAvatar';
import DoctorFormImages from '../doctor/reducers/DoctorFormImages';

import Pages from '../page/reducers/Pages';
import Page from '../page/reducers/Page';
import PageFormNew from '../page/reducers/PageFormNew';

import Services from '../service/reducers/Services';
import Service from '../service/reducers/Service';
import ServiceFormNew from '../service/reducers/ServiceFormNew';
import ServiceFormAvatar from '../service/reducers/ServiceFormAvatar';
import ServiceFormImages from '../service/reducers/ServiceFormImages';

import Blogs from '../blog/reducers/Blogs';
import Blog from '../blog/reducers/Blog';
import BlogFormNew from '../blog/reducers/BlogFormNew';
import BlogFormAvatar from '../blog/reducers/BlogFormAvatar';

import CatFaqs from '../catFaq/reducers/CatFaqs';
import CatFaq from '../catFaq/reducers/CatFaq';
import CatFaqFormNew from '../catFaq/reducers/CatFaqFormNew';

import QualificationFormNew from '../qualification/reducers/QualificationFormNew';
import Qualifications from '../qualification/reducers/Qualifications';

import SiteFormInfo from '../site/reducers/SiteFormInfo';
import Site from '../site/reducers/Site';

import Slideshows from '../slideshow/reducers/Slideshows';
import Slideshow from '../slideshow/reducers/Slideshow';
import SlideshowFormNew from '../slideshow/reducers/SlideshowFormNew';

const rootReducer = combineReducers({
	routing: routerReducer,
	theme: Theme,
	userAuth: UserAuth,
	userFormSignIn: UserFormSignIn,
	doctors: Doctors,
	doctor: Doctor,
	doctorFormNew: DoctorFormNew,
	doctorFormAvatar: DoctorFormAvatar,
	doctorFormImages: DoctorFormImages,
	pageFormNew: PageFormNew,
	pages: Pages,
	page: Page,
	services: Services,
	service: Service,
	serviceFormNew: ServiceFormNew,
	serviceFormAvatar: ServiceFormAvatar,
	serviceFormImages: ServiceFormImages,
	blogs: Blogs,
	blog: Blog,
	blogFormNew: BlogFormNew,
	blogFormAvatar: BlogFormAvatar,
	catFaqFormNew: CatFaqFormNew,
	catFaqs: CatFaqs,
	catFaq: CatFaq,
	qualificationFormNew: QualificationFormNew,
	qualifications: Qualifications,
	siteFormInfo: SiteFormInfo,
	site: Site,
	slideshowFormNew: SlideshowFormNew,
	slideshows: Slideshows,
	slideshow: Slideshow,
});

export default rootReducer;