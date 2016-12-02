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
			upAvatar: '/doctor/upAvatar'
		}
	}
};

export default API;