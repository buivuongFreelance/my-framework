export const CheckFunction = fn => {
	return typeof fn === 'function';
};

export const CheckAttr = (obj, attr) => {
	return obj.hasOwnProperty(attr);
};

export const CheckObj = (obj) => {
	if(obj === '')
		return false;
	return typeof(obj) === 'object';
};

export const CheckString = (str) => {
	return typeof(str) === 'string';
};

export const CheckEmpty = (obj) => {
	return obj === '' || typeof(obj) === 'undefined' || typeof(obj) === 'null';
};

export const CheckEmail = (obj) => {
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	return re.test(obj);
};

export const CheckArray = (obj) => {
	return !CheckEmpty(obj) && CheckAttr(obj, 'length');
};

export const CheckFile = (obj) => {
	return CheckEmpty(obj.webkitRelativePath);
};

export const CheckValidation = (event) => {
	if(!event) return false;
	return typeof event.webkitRelativePath === 'undefined' && !CheckString(event);
};