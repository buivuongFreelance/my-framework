import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Breadcrumb from '../app/breadcrumb';

import * as UserFormSignIn from './actions/formSignIn';
import {routerActions} from 'react-router-redux';

class UserSignIn extends Component{
	_onSubmitForm(e){
		e.preventDefault();
		this.props.userFormSignInSubmit(this.refs.login);
	}
	render(){
		const breadcrumb = [
			{name: this.props.intl.formatMessage({id: 'page.user.signin.title'})}
		];

		const {touched, errors} = this.props.userFormSignIn;

		return (
			<div className="mg-top-40">
				<Breadcrumb values={breadcrumb}/>
				<div className="tp-main-container">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet box green login" ref="login">
									<div className="portlet-title">
										<div className="caption">
											<i className="fa fa-user"/>
											&nbsp;
											<FormattedMessage id="page.user.signin.title"/>
										</div>
									</div>
									<div className="portlet-body form">
										<form className="form-horizontal" noValidation method="POST" onSubmit={this._onSubmitForm.bind(this)}>
											<div className="form-body">
												<div className="row">
													<div className="col-md-12">
														<div className={(touched && errors.email) ? 'form-group has-error': 'form-group'}>
															<label className="control-label col-md-3">
																<FormattedMessage id="global.field.email.title"/>
															</label>
															<div className="col-md-9">
																<input type="email" className="form-control"
																	onChange={(e) => this.props.userFormSignInChangeEmail(e.target.value)}
																	onFocus={() => this.props.userFormSignInFocus()}
																	onBlur={(e) => this.props.userFormSignInChangeEmail(e.target.value)}/>
																{touched && errors.email && <span className="help-block"><FormattedMessage id={errors.email}/></span>}
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12">
														<div className={(touched && errors.password) ? 'form-group has-error': 'form-group'}>
															<label className="control-label col-md-3">
																<FormattedMessage id="global.field.password.title"/>
															</label>
															<div className="col-md-9">
																<input type="password" className="form-control"
																	onChange={(e) => this.props.userFormSignInChangePassword(e.target.value)}
																	onFocus={() => this.props.userFormSignInFocus()}
																	onBlur={(e) => this.props.userFormSignInChangePassword(e.target.value)}/>
																{touched && errors.password && <span className="help-block"><FormattedMessage id={errors.password}/></span>}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="form-actions fluid">
												<div className="row">
													<div className="col-md-12">
														<div className="row">
															<div className="col-md-4">
																<button type="submit" className="btn green uppercase"><FormattedMessage id="page.user.signin.btn.submit"/></button>
															</div>
															<div className="col-md-4">
																<a onClick={() => this.props.push('/auth/user/signup')} className="forget-password"><FormattedMessage id="page.user.signup.btn.new"/></a>
				                        					</div>
				                        					<div className="col-md-4">
		                    									<a href="javascript:;" className="forget-password"><FormattedMessage id="global.btn.forgot.password"/></a>
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

const mapStateToProps = ({userFormSignIn}) => {
	return {userFormSignIn};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...UserFormSignIn,
		...routerActions
	}, dispatch);
};

const connecting = connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserSignIn));

export default connecting;