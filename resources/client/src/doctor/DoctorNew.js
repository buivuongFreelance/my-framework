import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import Datepicker from '../common/components/datepicker';

import * as DoctorFormNewActions from './actions/formNew';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

class DoctorNew extends Component{
	_onFocusField(){
		if(!this.props.doctorFormNew.touched)
			this.props.doctorFormNewFocus();
	}
	_onChangeField(field, event){
		const value = !is.string(event) ? event.target.value : event;
		let errors = Object.assign({}, this.props.doctorFormNew.errors);
		switch(field){
			case 'first_name':
				if(!is.empty(value)){
					if(value.length < 2)
						errors.first_name = 'Must At Least 2 Characters.';
					else
						errors.first_name = '';
				}else
					errors.first_name = '';
				break;
			case 'last_name':
				if(is.empty(value)){
					errors.last_name = 'Last Name Required.';
				}else if(value.length < 2)
					errors.last_name = 'Must At Least 2 Characters.';
				else
					errors.last_name = '';
				break;
			case 'password':
				const password_retype = this.props.doctorFormNew.values.password_retype;

				if(is.empty(value))
					errors.password = 'Password Required.';
				else if(value.length < 6)
					errors.password = 'Must At Least 6 Characters.';
				else if(password_retype !== value){
					errors.password_retype = 'Must The Same With Password';
					errors.password = '';
				}else{
					errors.password_retype = '';
					errors.password = '';
				}
				break;
			case 'password_retype':
				const password = this.props.doctorFormNew.values.password;
				if(password !== value)
					errors.password_retype = 'Must The Same With Password';
				else
					errors.password_retype = '';
				break;
			case 'email':
				if(is.empty(value))
					errors.email = 'Email Required';
				else if(!is.email(value))
					errors.email = 'Email Wrong !!!';
				else
					errors.email = '';
				break;
		}
		this.props.doctorFormNewValidation(errors);
		this.props.doctorFormNewChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		this._onFocusField();

		

		this._onChangeField('email', '');
		this._onChangeField('last_name', '');

		const errors = this.props.doctorFormNew.errors;
		let valid = true;
		for(let field in errors){
			let error = errors[field];
			if(error){
				valid = false;
				break;
			}
		}

		if(valid){
			console.log('asassaass');
		}

	}
	render(){
		const {touched, errors} = this.props.doctorFormNew;
		return (
			<div className="page-content-wrapper">
				<PageHead title={'New Doctor'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.doctorList)}>Doctor List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>New Doctor</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="portlet box blue-hoki">
									<div className="portlet-title">
										<div className="caption">
											Add A New Doctor
										</div>
									</div>
									<div className="portlet-body form">
										<form method="POST" noValidation className="form-horizontal" onSubmit={this._onSubmit.bind(this)}>
											<div className="form-body">
												
												<div className="row">
													<div className="col-md-6">
														<div className={(touched && errors.first_name) ? 'form-group has-error': 'form-group'}>
															<label className="col-md-3 control-label">
																First Name
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="First Name" className="form-control"
																	onChange={this._onChangeField.bind(this, 'first_name')}
																	onBlur={this._onChangeField.bind(this, 'first_name')}
																	onFocus={this._onFocusField.bind(this)}/>
																{touched && errors.first_name && <span className="help-block">{errors.first_name}</span>}
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className={(touched && errors.last_name) ? 'form-group has-error': 'form-group'}>
															<label className="col-md-3 control-label">
																Last Name
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Last Name" className="form-control"
																	onChange={this._onChangeField.bind(this, 'last_name')}
																	onBlur={this._onChangeField.bind(this, 'last_name')}
																	onFocus={this._onFocusField.bind(this)}/>
																{touched && errors.last_name && <span className="help-block">{errors.last_name}</span>}
															</div>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<div className={(touched && errors.password) ? 'form-group has-error': 'form-group'}>
															<label className="col-md-3 control-label">
																Password
															</label>
															<div className="col-md-9">
																<input type="password" placeholder="Password" className="form-control"
																	onChange={this._onChangeField.bind(this, 'password')}
																	onBlur={this._onChangeField.bind(this, 'password')}
																	onFocus={this._onFocusField.bind(this)}/>
																{touched && errors.password && <span className="help-block">{errors.password}</span>}
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className={(touched && errors.password_retype) ? 'form-group has-error': 'form-group'}>
															<label className="col-md-3 control-label">
																Re-Password
															</label>
															<div className="col-md-9">
																<input type="password" placeholder="Re-Typed Password" className="form-control"
																	onChange={this._onChangeField.bind(this, 'password_retype')}
																	onBlur={this._onChangeField.bind(this, 'password_retype')}
																	onFocus={this._onFocusField.bind(this)}/>
																{touched && errors.password_retype && <span className="help-block">{errors.password_retype}</span>}
															</div>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<div className={(touched && errors.email) ? 'form-group has-error': 'form-group'}>
															<label className="col-md-3 control-label">
																Email
															</label>
															<div className="col-md-9">
																<input type="email" placeholder="Email Address" className="form-control"
																	onChange={this._onChangeField.bind(this, 'email')}
																	onBlur={this._onChangeField.bind(this, 'email')}
																	onFocus={this._onFocusField.bind(this)}/>
																{touched && errors.email && <span className="help-block">{errors.email}</span>}
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																Birthday
															</label>
															<div className="col-md-9">
																<Datepicker type="birthday"
																	onChange={this._onChangeField.bind(this, 'birthday')}/>
															</div>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																Phone Number
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Phone Number" className="form-control"
																	onChange={this._onChangeField.bind(this, 'phone')}/>
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																Address
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Address" className="form-control"
																	onChange={this._onChangeField.bind(this, 'address')}/>
															</div>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																Job Title
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Job Title" className="form-control"
																	onChange={this._onChangeField.bind(this, 'job_title')}/>
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																Description
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Description" className="form-control"
																	onChange={this._onChangeField.bind(this, 'description')}/>
															</div>
														</div>
													</div>
												</div>

											</div>

											<div className="form-actions">
												<div className="row">
													<div className="col-md-6">
														<div className="row">
															<div className="col-md-offset-3 col-md-9">
																<button type="submit" className="btn green">
																	Create Doctor
																</button>
																&nbsp;
																<button type="button" className="btn default" onClick={() => this.props.push(Routes.backend.doctorList)}>
																	Cancel
																</button>
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
				</PageContent>
			</div>
		);
	};
};

const mapStateToProps = ({doctorFormNew}) => {
	return {doctorFormNew};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...routerActions,
		...DoctorFormNewActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorNew);