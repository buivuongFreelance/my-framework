import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCretors} from 'redux';

import PageHead from '../app/PageHead';
import PageContent from '../app/PageContent';

class DashboardView extends Component{
	render(){
		return(
			<div className="page-content-wrapper">
				<PageHead title={'Admin Dashboard'}/>
				<PageContent>
					<div className="row">
						View Dashboard
					</div>
				</PageContent>
			</div>
		);
	};
};

export default DashboardView;