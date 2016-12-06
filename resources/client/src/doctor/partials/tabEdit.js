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
				<li ref="avatar">
					<a onClick={() => this.props.push({
						pathname: Routes.backend.doctorEditAvatar,
						query: {uid: this.props.uid}
					})}> Avatar</a>
				</li>
				<li ref="form">
					<a onClick={() => this.props.push({
						pathname: Routes.backend.doctorEditInfo,
						query: {uid: this.props.uid}
					})}> Edit Information</a>
				</li>
				<li ref="uploads">
					<a onClick={() => this.props.push({
						pathname: Routes.backend.doctorEditImages,
						query: {uid: this.props.uid}
					})}> Other Images</a>
				</li>
				<li ref="qualifications">
					<a onClick={() => this.props.push({
						pathname: Routes.backend.doctorEditQualifications,
						query: {uid: this.props.uid}
					})}> Qualifications</a>
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