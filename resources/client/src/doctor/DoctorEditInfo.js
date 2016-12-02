import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import TabEdit from './partials/tabEdit';
import Datepicker from '../common/components/datepicker';

import * as ThemeActions from '../theme/actions';
import * as DoctorFormNewActions from './actions/formNew';
import * as DoctorViewActions from './actions/view';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

class DoctorEditInfo extends Component{
	componentDidMount(){
		let _this = this;
		const query = this.props.location.query;

		this.props.themeShowLoadingEl(this.refs.detail);
		this.props.doctorViewDetail(query.uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.doctorFormEditFill(_this.props.doctor);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.themeShowError(message);
		});
	}
	componentWillUnmount(){
		this.props.doctorFormNewClear();
	}
	_onFocusField(){
		if(!this.props.doctorFormNew.touched)
			this.props.doctorFormNewFocus();
	}
	_onChangeField(field, event){
		const value = (!is.string(event) && event) ? event.target.value : event;
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
		}
		this.props.doctorFormNewValidation(errors);
		this.props.doctorFormNewChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			const values = this.props.doctorFormNew.values;
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

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
				_this.props.themeShowLoadingEl(_this.refs.form);
				_this.props.doctorFormEditSubmit(values)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowSuccess(`Update Doctor ${_this.props.doctor.last_name} Successfully`);
					_this.props.push(Routes.backend.doctorList);
				})
				.catch(message => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowError(message);
				});
			}
		}, 0);
	}
	render(){
		const doctorName = `${this.props.doctor.first_name} ${this.props.doctor.last_name}`;
		const {touched, errors} = this.props.doctorFormNew;
		return (
			<div className="page-content-wrapper" ref="detail">
				<PageHead title={`Doctor ${doctorName}`}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.doctorList)}>Doctor List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>{doctorName}</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="tabbable-line boxless tabbable-reversed">
									<TabEdit uid={this.props.location.query.uid} active="form"/>
									<div className="tab-content">
										<div className="tab-pane active">
											<div className="portlet box blue-hoki" ref="form">
												<div className="portlet-title">
													<div className="caption">
														Edit {doctorName}
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
																				onFocus={this._onFocusField.bind(this)}
																				value={this.props.doctorFormNew.values.first_name}/>
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
																				onFocus={this._onFocusField.bind(this)}
																				value={this.props.doctorFormNew.values.last_name}/>
																			{touched && errors.last_name && <span className="help-block">{errors.last_name}</span>}
																		</div>
																	</div>
																</div>
															</div>

															<div className="row">
																<div className="col-md-6">
																	<div className="form-group">
																		<label className="col-md-3 control-label">
																			Email
																		</label>
																		<div className="col-md-9">
																			<p className="form-control-static">
																				{this.props.doctorFormNew.values.email}
																			</p>
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
																				onChange={this._onChangeField.bind(this, 'birthday')}
																				value={this.props.doctorFormNew.values.birthday}/>
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
																				onChange={this._onChangeField.bind(this, 'phone')}
																				value={this.props.doctorFormNew.values.phone}/>
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
																				onChange={this._onChangeField.bind(this, 'address')}
																				value={this.props.doctorFormNew.values.address}/>
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
																				onChange={this._onChangeField.bind(this, 'job_title')}
																				value={this.props.doctorFormNew.values.job_title}/>
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
																				onChange={this._onChangeField.bind(this, 'description')}
																				value={this.props.doctorFormNew.values.description}/>
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
																				Accept
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

							</div>
						</div>
					</div>
				</PageContent>
			</div>
		);
	};
};

const mapStateToProps = ({doctor, doctorFormNew}) => {
	return {doctor, doctorFormNew};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...DoctorViewActions,
		...DoctorFormNewActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorEditInfo);