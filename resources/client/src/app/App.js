import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';

class App extends Component {
  	render() {
	    return (
			<div>
				{this.props.children}
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