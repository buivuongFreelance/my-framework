import {DATE_NULL, DATA_LIMIT} from '../config';

import {CheckAttr, CheckEmpty} from './check';

export const DisplayDate = (date) => {
	if(date === DATE_NULL){
		return '';
	}
	if(CheckEmpty(date))
		return '';
	if(typeof date === 'undefined')
		return '';

	date = date.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = dateArr[1];
	const day = dateArr[2];

	return day+'/'+month+'/'+year;
};

export const DisplayDateTime = (dateTime) => {
	if(dateTime === DATE_NULL){
		return '';
	}
	if(CheckEmpty(dateTime))
		return '';
	if(typeof dateTime === 'undefined')
		return '';

	let date = dateTime.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = dateArr[1];
	const day = dateArr[2];

	let time = dateTime.split(' ')[1];
	const timeArr = time.split(':');
	const hour = timeArr[0];
	const minute = timeArr[1];
	const second = timeArr[2];

	return day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;
};

export const GetFilesUpload = files => {
	let rFiles = [];
	files.map(file => {
		if(!CheckAttr(file, 'uid'))
			rFiles.push(file);
	});
	return rFiles;
};

export const GetTotalPages = all => {
	if(all === 0)
		return 1;
	return Math.ceil(all/DATA_LIMIT);
};

export const GetOffsetPage = page => {
	return (page-1)*DATA_LIMIT;
};