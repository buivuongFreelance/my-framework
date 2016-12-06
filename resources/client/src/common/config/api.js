const API = {
	backend: {
		user: {
			signIn: '/authenticate/admin/signin'
		},
		doctor: {
			view: '/doctor/list',
			create: '/doctor/create',
			detail: '/doctor/detail',
			update: '/doctor/update',
			upAvatar: '/doctor/upAvatar',
			upImage: '/doctor/upImage',
			removeImage: '/doctor/removeImage'
		},
		page: {
			view: '/page/list',
			create: '/page/create',
			remove: '/page/remove',
			detail: '/page/detail',
			update: '/page/update'
		},
		service: {
			view: '/service/list',
			create: '/service/create',
			detail: '/service/detail',
			update: '/service/update',
			upAvatar: '/service/upAvatar',
			upImage: '/service/upImage',
			removeImage: '/service/removeImage',
			remove: '/service/remove'
		},
		blog: {
			view: '/blog/list',
			create: '/blog/create',
			detail: '/blog/detail',
			update: '/blog/update',
			upAvatar: '/blog/upAvatar',
			remove: '/blog/remove'
		},
		catFaq: {
			view: '/catFaq/list',
			create: '/catFaq/create',
			remove: '/catFaq/remove',
			detail: '/catFaq/detail',
			update: '/catFaq/update'
		},
		qualification: {
			create: '/qualification/create',
			remove: '/qualification/remove',
			viewByDoctor: '/qualification/listByDoctor',
			update: '/qualification/update'
		},
		site: {
			detail: '/site/detail',
			updateInfo: '/site/updateInfo',
			updateSocial: '/site/updateSocial'
		},
		slideshow: {
			view: '/slideshow/list',
			create: '/slideshow/create',
			detail: '/slideshow/detail',
			update: '/slideshow/update',
			remove: '/slideshow/remove'
		}
	}
};

export default API;