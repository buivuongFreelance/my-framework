import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Modal from '../../common/components/modal';

import * as ThemeActions from '../../theme/actions';
import {routerActions} from 'react-router-redux';

import {DEFAULT_URL} from '../../common/config';

class Header extends Component {
	constructor(){
		super();
		this.state = {
			modalSignin: false,
			modalSignUp: false
		};
	}
  	render() {
	    return (
	    	<div>
	    		<Modal modal={this.state.modalSignin}>
					<div className="modal-header">
						<button type="button" className="close" onClick={() => this.setState({modalSignin: false})}>
							<span aria-hidden="true">&times;</span>
                			<span className="sr-only">Close</span>
						</button>
						<h4 className="modal-title">Đăng nhập</h4>
					</div>
					<div className="modal-body">
						<div className="form-horizontal" ref="create">
							<div className="form-body">

								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<label className="control-label col-md-3">
												Email
											</label>
											<div className="col-md-9">
												<input type="email" placeholder="Email" className="form-control"
													onChange={event =>  this._onChangeField('name', event.target.value)}
													onFocus={() => this._onFocusField()}/>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<label className="control-label col-md-3">
												Mật khẩu
											</label>
											<div className="col-md-9">
												<input type="text" placeholder="Mật khẩu" className="form-control"
													onChange={event =>  this._onChangeField('description', event.target.value)}
													onFocus={() => this._onFocusField()}/>
											</div>
										</div>
									</div>
								</div>

							</div>

						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn tp-btn-second"
							onClick={() => this._onCreateQualification()}>Đăng nhập</button>
						<button type="button" className="btn tp-btn-default"
							onClick={() => this.setState({modalSignin: false})}>Đóng</button>
					</div>
				</Modal>
				<div className="tp-top-bar">
					<div className="container">
						<div className="row">
							<div className="col-md-6 clinic-address">
								<i className="fa fa-map-marker"/> {this.props.site.address}
							</div>
							<div className="col-md-6 tp-social">
	        					<ul>
	          						<li><a href={this.props.site.facebook_link}><i className="fa fa-facebook"></i></a></li>
	          						<li><a href={this.props.site.twitter_link}><i className="fa fa-twitter"></i></a></li>
	          						<li><a href={this.props.site.gplus_link}><i className="fa fa-google"></i></a></li>
	        					</ul>
	      					</div>
						</div>
					</div>
				</div>
				<header className="tp-header">
					<div className="container">
				    	<div className="row">
				      		<div className="col-md-3 tp-logo">
				        		<a className="navbar-brand">
				        			<img src={DEFAULT_URL+'/storage/'+this.props.site.avatar} alt="" className="img-responsive"
				        				width="135" height="45"/>
				        		</a>
				        	</div>
				      		<div className="col-md-9 tp-top-link">
				        		<p className="navbar-text navbar-right">
				        			<button type="button" className="btn tp-btn-second"
				        				onClick={()=>this.setState({modalSignin: true})}>Đăng nhập</button>
				        			&nbsp;
				        			<button type="button" className="btn tp-btn-second">Đăng ký</button>
				      			</p>
				    		</div>
				  		</div>
				  	</div>
				</header>
				<div className="tp-navigation affix-top" id="nav">
					<nav className="navbar navbar-default navbar-static-top marginBottom-0" role="navigation">
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
									<li className="dropdown">
										<a>
											Trang chủ
										</a>
									</li>
									<li className="dropdown">
										<a>
											Dịch vụ
										</a>
									</li>
									<li className="dropdown">
										<a>
											Bác sĩ
										</a>
									</li>
									<li className="dropdown">
										<a>
											Thông tin
										</a>
									</li>
									<li className="dropdown">
										<a>
											Giới thiệu
										</a>
									</li>
									<li className="dropdown">
										<a>
											Hỏi đáp
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
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
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);