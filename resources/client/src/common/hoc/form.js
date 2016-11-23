import React, {Component} from 'react';

const HOCForm = (...params) => {
	console.log(params);
	return (WrappedComponent) => {
		return class HOC extends Component{
			render(){
				return <WrappedComponent {...this.props}/>
			};
		};
	};
};

export default HOCForm;