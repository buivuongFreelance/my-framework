import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Footer extends Component{
	render(){
		return (
			<div className="page-footer">
				<div className="container">
					2016 © Primacare Theme
				</div>
			</div>
		);
	};
};

export default Footer;