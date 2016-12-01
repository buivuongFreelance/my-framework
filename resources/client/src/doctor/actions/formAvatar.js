import {
	DOCTOR_FORM_AVATAR_CHANGE
} from '../types/formAvatar';

export const doctorFormAvatarChange = (field, value) => {
	return {
		type: DOCTOR_FORM_AVATAR_CHANGE,
		payload: {field, value}
	};
};