import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as UserAuthActions from '../user/actions/auth';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

class Header extends Component{
	_onLogout(){
		this.props.userAuthRemoveToken();
		this.props.userAuthSignOut();
		this.props.push(Routes.backend.signin);
	}
	_renderSignOutUser(){
		if(this.props.userAuth.email){
			return (
				<li>
					<a onClick={()=>this.props.userAuthSignOut()}>
						<i className="icon-logout"/> Sign Out User
					</a>
				</li>
			);
		}else return null;
	}
	render(){
		return (
			<div className="page-header">
				<div className="page-header-top">
					<div className="container">
						<div className="page-logo">
							<a>
								<img src="http://vignette2.wikia.nocookie.net/disney/images/3/34/Zootopia_logo.png/revision/latest/scale-to-width-down/150?cb=20160305024507" className="logo-default"/>
							</a>
						</div>
						<a href="javascript:;" className="menu-toggler"/>
						<div className="top-menu">
							<ul className="nav navbar-nav pull-right">
								<li className="dropdown dropdown-user dropdown-dark">
									<a onClick={this._onLogout.bind(this)}>
										<i className="icon-logout"/>
										&nbsp;
										<span className="username">Logout</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="page-header-menu">
					<div className="container">
                  	
                    	<div className="hor-menu">
                    		<ul className="nav navbar-nav">
                    			<li>
                    				<a onClick={()=>this.props.push(Routes.backend.dashboard)}>
                    					Dashboard
	                                </a>
                    			</li>
                    			<li className="menu-dropdown">
                    				<a onClick={()=>this.props.push(Routes.backend.doctorList)}>
                    					Doctors
	                                </a>
                    			</li>
                    		</ul>
                    	</div>
					</div>

				</div>
			</div>
		);
	};
};

const mapStateToProps = ({userAuth}) => {
	return {userAuth};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...routerActions,
		...UserAuthActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);