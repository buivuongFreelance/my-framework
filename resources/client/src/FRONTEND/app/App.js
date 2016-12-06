import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ThemeActions from '../../theme/actions';
import * as SiteViewActions from '../../site/actions/view';
import {routerActions} from 'react-router-redux';
import Routes from '../../common/config/routes';

import Header from './Header';
import Footer from './Footer';

import ScriptHOC from '../../common/hoc/Script';
import CSS from '../../common/config/css';

import Slideshow from '../../common/components/slideshow';

class App extends Component {
	componentDidMount(){
		this.props.push(Routes.frontend.homepage);
		this.props.siteViewDetail();
	}
  	render() {
	    return (
			<div>
				<Header/>
				{this.props.children}
				<Footer/>
			</div>
	    );
  	};
};

const mapStateToProps = ({userAuth, site}) => {
	return {userAuth, site};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...SiteViewActions,
		...routerActions
	}, dispatch);
};

const Connecting = ScriptHOC(
	{
		css: [CSS.theme]
	}
)(App)
export default connect(mapStateToProps, mapDispatchToProps)(Connecting);