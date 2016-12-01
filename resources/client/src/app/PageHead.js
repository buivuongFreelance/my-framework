import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PageHead extends Component{
	render(){
		return (
			<div className="page-head">
				<div className="container">
					<div className="page-title">
						<h1>{this.props.title}</h1>
					</div>
					<div className="page-toolbar">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	};
};

export default PageHead;