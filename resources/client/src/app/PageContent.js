import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PageHead extends Component{
	render(){
		return (
			<div className="page-content">
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	};
};

export default PageHead;