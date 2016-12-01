import {
	THEME_NO_ACTION
} from '../../theme/types';

import axios from 'axios';

export const doctorBackendLoadList = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				axios.post('/doctor/list')
				.then(response => {
					dispatch({type: THEME_NO_ACTION});
					resolve(response.data);
				})
				.catch(error => {
					if(error.response){
						let message = '';
						if(error.response.status === 401){
							const errors = error.response.data;
							for(let field in errors)
								message = errors[field][0];
						}else
							message = error.response.data.message;
						reject(message);
					}
				});
			}, 1500);
		});
	};
};