import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {routerActions} from 'react-router-redux';
import * as UserFormSignUp from './actions/formSignUp';

import Datepicker from '../common/components/datepicker';

class UserSignUp extends Component{
	_onSubmitForm(e){
		e.preventDefault();
		this.props.userFormSignUpSubmit(this.refs.signup);
	}
	componentWillUnmount(){
		this.props.userFormSignUpClear();
	}
	render(){
		const breadcrumb = [
			{name: this.props.intl.formatMessage({id: 'page.user.signup.title'})}
		];

		const {touched, errors} = this.props.userFormSignUp;
		return (
			<div className="mg-top-40">
				<div className="tp-main-container">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet box green" ref="signup">
									<div className="portlet-title">
										<div className="caption">
											<i className="fa fa-user"/> <FormattedMessage id="page.user.signup.title"/>
										</div>
									</div>
									<div className="portlet-body form">
										<form noValidation method="POST" onSubmit={this._onSubmitForm.bind(this)}>
											<div className="form-body">
												<div className="row">
													<div className="col-md-6">
														<div className={(touched && errors.first_name) ? 'form-group has-error': 'form-group'}>
															<label className="control-label">
																<FormattedMessage id="global.field.first_name.title"/>
															</label>
															<input type="text" className="form-control"
																onChange={(e) => this.props.userFormSignUpChangeFirstName(e.target.value)}
																onFocus={() => this.props.userFormSignUpFocus()}
																onBlur={(e) => this.props.userFormSignUpChangeFirstName(e.target.value)}/>
															{touched && errors.first_name && <span className="help-block"><FormattedMessage id={errors.first_name}/></span>}
														</div>
													</div>
													<div className="col-md-6">
														<div className={(touched && errors.last_name) ? 'form-group has-error': 'form-group'}>
															<label className="control-label">
																<FormattedMessage id="global.field.last_name.title"/>
															</label>
															<input type="text" className="form-control"
																onChange={(e) => this.props.userFormSignUpChangeLastName(e.target.value)}
																onFocus={() => this.props.userFormSignUpFocus()}
																onBlur={(e) => this.props.userFormSignUpChangeLastName(e.target.value)}/>
															{touched && errors.last_name && <span className="help-block"><FormattedMessage id={errors.last_name}/></span>}
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6">
														<div className={(touched && errors.email) ? 'form-group has-error': 'form-group'}>
															<label className="control-label">
																<FormattedMessage id="global.field.email.title"/>
															</label>
															<input type="email" className="form-control"
																onChange={(e) => this.props.userFormSignUpChangeEmail(e.target.value)}
																onFocus={() => this.props.userFormSignUpFocus()}
																onBlur={(e) => this.props.userFormSignUpChangeEmail(e.target.value)}/>
															{touched && errors.email && <span className="help-block"><FormattedMessage id={errors.email}/></span>}
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">
																<FormattedMessage id="global.field.birthday.title"/>
															</label>
															<Datepicker type="birthday"
																onChange={(value) => this.props.userFormSignUpChangeBirthday(value)}/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6">
														<div className={(touched && errors.password) ? 'form-group has-error': 'form-group'}>
															<label className="control-label">
																<FormattedMessage id="global.field.password.title"/>
															</label>
															<input type="password" className="form-control"
																onChange={(e) => this.props.userFormSignUpChangePassword(e.target.value)}
																onFocus={() => this.props.userFormSignUpFocus()}
																onBlur={(e) => this.props.userFormSignUpChangePassword(e.target.value)}/>
															{touched && errors.password && <span className="help-block"><FormattedMessage id={errors.password}/></span>}
														</div>
													</div>
													<div className="col-md-6">
														<div className={(touched && errors.password_retype) ? 'form-group has-error': 'form-group'}>
															<label className="control-label">
																<FormattedMessage id="global.field.password_retype.title"/>
															</label>
															<input type="password" className="form-control"
																onChange={(e) => this.props.userFormSignUpChangeRePassword(e.target.value)}
																onFocus={() => this.props.userFormSignUpFocus()}
																onBlur={(e) => this.props.userFormSignUpChangeRePassword(e.target.value)}/>
															{touched && errors.password_retype && <span className="help-block"><FormattedMessage id={errors.password_retype}/></span>}
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12">
														<div className="form-group">
															<label className="control-label">
																<FormattedMessage id="global.field.address.title"/>
															</label>
															<input type="text" className="form-control"
																onChange={(e) => this.props.userFormSignUpChangeAddress(e.target.value)}
																onFocus={() => this.props.userFormSignUpFocus()}
																onBlur={(e) => this.props.userFormSignUpChangeAddress(e.target.value)}/>
														</div>
													</div>
												</div>
											</div>
											<div className="form-actions fluid">
												<div className="row">
													<div className="col-md-12">
														<div className="row">
															<div className="col-md-4">
																<button type="submit" className="btn green uppercase"><FormattedMessage id="page.user.signup.btn.submit"/></button>
															</div>
															<div className="col-md-8 text-right">
																<a className="forget-password" onClick={(e) => this.props.push('/auth/user/signin')}>
																	<FormattedMessage id="global.btn.back.signin"/>
																</a>
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
	};
};

const mapStateToProps = ({userFormSignUp}) => {
	return {userFormSignUp};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...routerActions,
		...UserFormSignUp
	}, dispatch);
};

const connecting = connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserSignUp));

export default connecting;