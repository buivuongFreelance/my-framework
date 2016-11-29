import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {routerActions} from 'react-router-redux';
import * as UserAuthActions from '../user/actions/auth';

import ConfirmModal from '../common/components/confirm';

class Header extends Component{
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
	_renderSignInUser(){
		if(this.props.userAuth.email){
			return null;
		}else{
			return (
				<li>
					<a onClick={()=>this.props.push('/auth/user/signin')}>
						<i className="icon-user"/> Sign In User
					</a>
				</li>
			);
		}
	}
	_renderSignInDoctor(){
		if(this.props.userAuth.email){
			return null;
		}else{
			return (
				<li>
					<a onClick={()=>this.props.push('/auth/user/signin')}>
						<i className="icon-heart"/> Sign In Doctor
					</a>
				</li>
			);
		}	
	}
	render(){
		return (
			<div className="page-header">
				<ConfirmModal/>
				<div className="tp-top-bar">
					<div className="container">
						<div className="row">
							<div className="col-md-6 clinic-address">
								<div>
									<i className="fa fa-map-marker"/>&nbsp;
									 28 Jackson, Near Street 1020 Chicago, IL 60604-2340
								</div>
							</div>
							<div className="col-md-6 tp-social">
								<ul>
									<li>
										<a><i className="fa fa-facebook"/></a>
									</li>
									<li>
										<a><i className="fa fa-twitter"/></a>
									</li>
									<li>
										<a><i className="fa fa-google-plus"/></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="page-header-top">
					<div className="container">
						<div className="page-logo">
							<a>
								<img src="http://jituchauhan.com/medical/dentist/green/html-regular/images/logo.png" className="logo-default"/>
							</a>
						</div>
						<a href="javascript:;" className="menu-toggler"></a>
						<div className="top-menu">
							<ul className="nav navbar-nav pull-right">
								{/*<li className="dropdown dropdown-notification dropdown-light" id="header_notification_bar">
									<a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
										<i className="icon-bell"></i>
	                                    <span className="badge badge-default">3</span>
									</a>
									<ul className="dropdown-menu">
										<li>
                                        	<a>This is Notification 1</a>
                                    	</li>
                                    	<li>
                                        	<a>This is Notification 2</a>
                                    	</li>
                                    	<li>
                                        	<a>THis is Notification 3</a>
                                    	</li>
									</ul>
								</li>*/}
								{this._renderSignInUser()}
								{this._renderSignInDoctor()}
								{this._renderSignOutUser()}
								{/*<li className="dropdown dropdown-user dropdown-light">
									<a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
										<img alt="" className="img-circle" src="http://keenthemes.com/preview/metronic/theme/assets/layouts/layout3/img/avatar9.jpg"/>
										<span className="username username-hide-mobile">Nick</span>
									</a>
									<ul className="dropdown-menu dropdown-menu-default">
										<li>
	                                        <a>
	                                        	<i className="icon-user"></i> My Profile
	                                        </a>
	                                    </li>
	                                    <li>
                                        	<a>
                                            	<i className="icon-key"></i> Log Out
                                            </a>
                                    	</li>
									</ul>
								</li>*/}
							</ul>
						</div>
					</div>
				</div>
				<div className="page-header-menu">
					<div className="container">
						<form className="search-form">
                        	<div className="input-group">
                            	<input type="text" className="form-control" placeholder="Search" name="query"/>
                            	<span className="input-group-btn">
                                	<a href="javascript:;" className="btn submit">
                                    	<i className="icon-magnifier"></i>
                                	</a>
                            	</span>
                        	</div>
                    	</form>
                    	
                    	<div className="hor-menu">
                    		<ul className="nav navbar-nav">
                    			<li>
                    				<a>
                    					Home
	                                </a>
                    			</li>
                    			<li className="menu-dropdown">
                    				<a>
                    					Services
	                                </a>
                    			</li>
                    			<li className="menu-dropdown">
                    				<a>
                    					Doctors
	                                </a>
                    			</li>
                    			<li className="menu-dropdown">
                    				<a>
                    					News
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