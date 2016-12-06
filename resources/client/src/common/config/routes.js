const routes = {
	backend: {
		main: '/backend',
		signin: '/backend/auth/user/signin',
		dashboard: '/backend/auth/dashboard/view',
		doctorList: '/backend/auth/doctor/view',
		doctorNew: '/backend/auth/doctor/new',
		doctorEditAvatar: '/backend/auth/doctor/edit/avatar',
		doctorEditInfo: '/backend/auth/doctor/edit/info',
		doctorEditImages: '/backend/auth/doctor/edit/images',
		doctorEditQualifications: '/backend/auth/doctor/edit/qualifications',
		pageList: '/backend/auth/page/view',
		pageNew: '/backend/auth/page/new',
		pageEdit: '/backend/auth/page/edit',
		serviceList: '/backend/auth/service/view',
		serviceNew: '/backend/auth/service/new',
		serviceEditAvatar: '/backend/auth/service/edit/avatar',
		serviceEditInfo: '/backend/auth/service/edit/info',
		serviceEditImages: '/backend/auth/service/edit/images',
		blogList: '/backend/auth/blog/view',
		blogNew: '/backend/auth/blog/new',
		blogEditAvatar: '/backend/auth/blog/edit/avatar',
		blogEditInfo: '/backend/auth/blog/edit/info',
		catFaqList: '/backend/auth/catFaq/view',
		catFaqNew: '/backend/auth/catFaq/new',
		catFaqEdit: '/backend/auth/catFaq/edit',
		siteView: '/backend/auth/site/view',
		siteSocial: '/backend/auth/site/social',
		slideshowList: '/backend/auth/slideshow/view',
		slideshowNew: '/backend/auth/slideshow/new',
		slideshowEdit: '/backend/auth/slideshow/edit',
	},
	frontend: {
		homepage: '/'
	}
};

export default routes;