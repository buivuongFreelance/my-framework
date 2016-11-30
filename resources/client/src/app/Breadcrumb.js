import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

class Breadcrumb extends Component{
	render(){
		return (
			<ul className="page-breadcrumb breadcrumb">
				<li>
					<a onClick={()=>this.props.push(Routes.backend.dashboard)}>Dashboard</a>
					<i className="fa fa-circle"/>
				</li>
				{this.props.children}
			</ul>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...routerActions
	}, dispatch);
};

export default connect(null, mapDispatchToProps)(Breadcrumb);