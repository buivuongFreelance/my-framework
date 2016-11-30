import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class UserDashboard extends Component{
	render(){
		return (
			<div className="mg-top-40">
				User Dashboard
			</div>
		);
	};
};

export default UserDashboard;