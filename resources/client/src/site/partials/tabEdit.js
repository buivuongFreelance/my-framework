import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ThemeActions from '../../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../../common/config/routes';

class TabEdit extends Component{
	componentDidMount(){
		this.props.themeAddTabActive(this.refs[this.props.active]);
	}
	render(){
		return (
			<ul className="nav nav-tabs">
				<li ref="info">
					<a onClick={() => this.props.push({
						pathname: Routes.backend.siteView
					})}> Site Info</a>
				</li>
				<li ref="social">
					<a onClick={() => this.props.push({
						pathname: Routes.backend.siteSocial
					})}> Site Social</a>
				</li>
			</ul>
		);
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...routerActions,
		...ThemeActions
	}, dispatch);
};

export default connect(null, mapDispatchToProps)(TabEdit);