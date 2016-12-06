import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';

import Header from './Header';
import Footer from './Footer';

import Routes from '../common/config/routes';
import {BACKEND} from '../common/config';

class App extends Component {
	componentWillMount(){
		if(this.props.location.pathname === Routes.backend.main)
			this.props.push(Routes.backend.signin);
	}
	componentDidMount(){
		this.props.themeAddBodyMain();
	}
	componentWillUnmount(){
		this.props.themeRemoveBodyMain();
	}
	_renderHeader(){
		if(this.props.location.pathname === Routes.backend.signin)
			return null;
		else
			return <Header/>;
	}
	_renderFooter(){
		if(this.props.location.pathname === Routes.backend.signin)
			return null;
		else
			return <Footer/>;
	}
  	render() {
	    return (
			<div>
				<div>
					{this._renderHeader()}
					<div className="page-container">
						{this.props.children}
					</div>
					{this._renderFooter()}
				</div>
			</div>
	    );
  	};
};

const mapStateToProps = ({userAuth}) => {
	return {userAuth};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);