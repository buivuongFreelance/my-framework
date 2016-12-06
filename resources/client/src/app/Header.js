import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ConfirmModal from '../common/components/confirm';

import * as UserAuthActions from '../user/actions/auth';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

class Header extends Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		}
	}
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
				<ConfirmModal message="Do you really want leave backend?"
					modal={this.state.confirm}
					onAccept={this._onLogout.bind(this)}
					onRequestClose={()=>this.setState({confirm: false})}/>
				<div className="page-header-top">
					<div className="container">
						<div className="page-logo">
							<a onClick={()=>this.props.push(Routes.backend.dashboard)}>
								<img src="http://pmc.nextcare.com/wp-content/uploads/sites/10/2014/08/primacarelogo.png" width="220" height="60" className="logo-default"/>
							</a>
						</div>
						<a href="javascript:;" className="menu-toggler"/>
						<div className="top-menu">
							<ul className="nav navbar-nav pull-right">
								<li className="dropdown dropdown-user dropdown-dark">
									<a onClick={() => this.setState({confirm: true})}>
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
                    			<li>
                    				<a onClick={()=>this.props.push(Routes.backend.siteView)}>
                    					Site
	                                </a>
                    			</li>
                    			<li>
                    				<a onClick={()=>this.props.push(Routes.backend.slideshowList)}>
                    					Slideshows
	                                </a>
                    			</li>
                    			<li>
                    				<a onClick={()=>this.props.push(Routes.backend.pageList)}>
                    					Pages
	                                </a>
                    			</li>
                    			<li className="menu-dropdown classic-menu-dropdown">
                    				<a onClick={()=>this.props.push(Routes.backend.doctorList)}>
                    					Doctors
	                                </a>
	                                {/*<ul className="dropdown-menu pull-left">
	                                	<li>
	                                		<a className="nav-link">Qualifications</a>
	                                	</li>
	                                </ul>*/}
                    			</li>
                    			<li>
                    				<a onClick={()=>this.props.push(Routes.backend.serviceList)}>
                    					Services
	                                </a>
                    			</li>
                    			<li>
                    				<a onClick={()=>this.props.push(Routes.backend.blogList)}>
                    					Blogs
	                                </a>
                    			</li>
                    			<li>
                    				<a onClick={()=>this.props.push(Routes.backend.catFaqList)}>
                    					FAQs Category
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