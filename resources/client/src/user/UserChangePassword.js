import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ScriptHOC from '../common/hoc/Script';
import CSS from '../common/config/css';
import JS from '../common/config/js';
import Breadcrumb from '../app/breadcrumb';

class UserSignIn extends Component{
	componentDidMount(){
		toastr.success('Successful Login For Server', 'Notifications', {timeOut: 100000});
		toastr.error('Error Login For Server', 'Notifications', {timeOut: 100000});
	}
	render(){
		const breadcrumb = [
			{name: 'page.user.login.title'}
		];

		return (
			<div className="mg-top-40">
				<Breadcrumb values={breadcrumb}/>
				<div className="tp-main-container">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet box green login">
									<div className="portlet-title">
										<div className="caption">
											<i className="fa fa-user"/> <FormattedMessage id="page.user.login.title"/>
										</div>
									</div>
									<div className="portlet-body form">
										<form noValidation method="POST">
											<div className="form-body">
												<div className="row">
													<div className="col-md-12">
														<div className="form-group has-error">
															<label className="control-label">
																Enter Your New Password
															</label>
															<input type="password" className="form-control" placeholder="Email Address"/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12">
														<div className="form-group has-error">
															<label className="control-label">
																Re-Enter Your New Password
															</label>
															<input type="password" className="form-control" placeholder="Email Address"/>
														</div>
													</div>
												</div>
											</div>
											<div className="form-actions fluid">
												<div className="row">
													<div className="col-md-12">
														<div className="row">
															<div className="col-md-4">
																<button type="submit" className="btn green uppercase">Accept Email</button>
															</div>
															<div className="col-md-8 text-right">
																<a href="javascript:;" className="forget-password">Back To Login</a>
				                        					</div>
														</div>
													</div>
												</div>
											</div>
											
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {intl: state.intl};
};

const connecting = connect(mapStateToProps)(UserSignIn);

export default connecting;