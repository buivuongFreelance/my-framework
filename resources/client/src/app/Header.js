import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ThemeActions} from '../theme';

class Header extends Component{
	render(){
		let renderLogout = (
			<div>Render Logout</div>
		)
		let renderLogin = (
			<div>Render Login</div>
		)

		/*if(!this.props.patientAuth.authenticate){
			renderLogout = null;
			renderLogin = (
				<a className="navbar-link" onClick={this.props.themeClickClientLogin}>
					Login Client
				</a>
			)
		}*/

		return (
			<div className="page-header">
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
								<li>
									<a>
										<i className="icon-user"/> Login User
									</a>
								</li>
								<li>
									<a>
										<i className="icon-heart"/> Login Doctor
									</a>
								</li>
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

		/*return (
			<header id="layout-header">
				<div className="main-holder">
					<div className="tp-top-bar">
						<div className="container">
							<div className="row">
								<div className="col-md-6 clinic-address">
	          						<div>
	          							<i className="fa fa-map-marker"></i> 28 Jackson, Near Street 1020 Chicago, IL 60604-2340
	          						</div>
	        					</div>
	        					<div className="col-md-6 tp-social">
						        	<ul>
						            	<li><a href="#"><i className="fa fa-facebook"></i></a></li>
						            	<li><a href="#"><i className="fa fa-twitter"></i></a></li>
						            	<li><a href="#"><i className="fa fa-google"></i></a></li>
						          	</ul>
						        </div>
							</div>
						</div>
					</div>
					<header className="tp-header">
						<div className="container">
							<div className="row">
								<div className="col-md-3 tp-logo">
									<a className="navbar-brand"><img src="http://jituchauhan.com/medical/dentist/green/html-regular/images/logo.png" className="img-responsive"/></a>
								</div>
								<div className="col-md-9 tp-top-link">
          							<p className="navbar-text navbar-right">
          								<a className="link">
          									<i className="fa fa-comments-o"></i> 24/7 Support
          								</a>
          								<a className="link">
          									<i className="fa fa-phone"></i> 1800-123-4567
          								</a>
          								{renderLogin}
          								{renderLogout}
          							</p>
        						</div>
							</div>
						</div>
					</header>
					<div className="tp-navigation" id="headersticky">
						<nav className="navbar navbar-default navbar-static-top marginBottom-0">
							<div className="container">
								<div className="navbar-header">
          							<button type="button" className="navbar-toggle" 
          								data-toggle="collapse" data-target="#navbar-collapse-1">
          								<span className="sr-only">Toggle navigation</span> 
          								<span className="icon-bar"></span> 
          								<span className="icon-bar"></span>
          								<span className="icon-bar"></span>
          							</button>
        						</div>
        						<div className="collapse navbar-collapse" id="navbar-collapse-1">
        							<ul className="nav navbar-nav">
        								<li><a href="{{ 'homepage'|page }}" title="Home">Home</a></li>
        								<li><a href="{{ 'about-us'|page }}" title="About Us">About Us</a></li>
            							<li><a href="{{ 'terms-conditions'|page }}" title="About Us">Terms Of Conditions</a></li>
							            <li><a href="{{ 'sitemap'|page }}" title="Sitemap">Sitemap</a></li>
							            <li><a href="{{ 'faq'|page }}" title="Faq">Faq</a></li>
							            <li><a href="{{ 'news'|page }}" title="News">News</a></li>
							            <li><a href="{{ 'doctors'|page }}" title="Doctors">Doctors</a></li>
							            <li><a href="{{ 'services'|page }}" title="Services">Services</a></li>
        							</ul>
        						</div>
							</div>
						</nav>
					</div>
				</div>
			</header>
		);*/
	};
};

const mapStateToProps = ({patientAuth}) => {
	return {patientAuth};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...ThemeActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);