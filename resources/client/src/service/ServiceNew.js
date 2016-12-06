import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import RichEditor from '../common/components/richEditor';

import * as ServiceFormNewActions from './actions/formNew';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {CheckString, CheckEmpty} from '../common/helpers/check';

class ServiceNew extends Component{
	componentWillUnmount(){
		this.props.serviceFormNewClear();
	}
	_onFocusField(){
		if(!this.props.serviceFormNew.touched)
			this.props.serviceFormNewFocus();
	}
	_onChangeField(field, event){
		const value = (!CheckString(event) && event) ? event.target.value : event;
		let errors = Object.assign({}, this.props.serviceFormNew.errors);
		switch(field){
			case 'name':
				if(CheckEmpty(value))
					errors.name = 'Name Required.';
				else
					errors.name = '';
				break;
		}
		this.props.serviceFormNewValidation(errors);
		this.props.serviceFormNewChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			let values = $.extend({}, _this.props.serviceFormNew.values);
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

			const errors = this.props.serviceFormNew.errors;
			let valid = true;
			for(let field in errors){
				let error = errors[field];
				if(error){
					valid = false;
					break;
				}
			}
			if(valid){
				values.user_uid = _this.props.userAuth.uid;
				_this.props.themeShowLoadingEl(_this.refs.form);
				_this.props.serviceFormNewSubmit(values)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowSuccess('Create New Service Successfully');
					_this.props.push(Routes.backend.serviceList);
				})
				.catch(message => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowError(message);
				});
			}
		}, 0);
	}
	render(){
		const {touched, errors} = this.props.serviceFormNew;
		return (
			<div className="page-content-wrapper">
				<PageHead title={'New Service'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.serviceList)}>Service List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>New Service</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="portlet box blue-hoki" ref="form">
									<div className="portlet-title">
										<div className="caption">
											Add A New Service
										</div>
									</div>
									<div className="portlet-body form">
										<form method="POST" noValidation className="horizontal-form" onSubmit={this._onSubmit.bind(this)}>
											<div className="form-body">
												
												<div className="row">
													<div className="col-md-6">
														<div className={(touched && errors.name) ? 'form-group has-error': 'form-group'}>
															<label className="control-label">
																Name
															</label>
															<input type="text" placeholder="Name" className="form-control"
																onChange={this._onChangeField.bind(this, 'name')}
																onBlur={this._onChangeField.bind(this, 'name')}
																onFocus={this._onFocusField.bind(this)}/>
															{touched && errors.name && <span className="help-block">{errors.name}</span>}
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">
																Description
															</label>
															<input type="text" placeholder="Description" className="form-control"
																onChange={this._onChangeField.bind(this, 'description')}
																onBlur={this._onChangeField.bind(this, 'description')}
																onFocus={this._onFocusField.bind(this)}/>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-md-12">
														<div className="form-group">
															<label className="control-label">
																Content
															</label>
															<RichEditor
																onChange={this._onChangeField.bind(this, 'content')}
																onFocus={this._onFocusField.bind(this)}/>
														</div>
													</div>
												</div>

											</div>

											<div className="form-actions">
												<div className="row">
													<div className="col-md-12">
														<div className="row">
															<div className="col-md-9">
																<button type="submit" className="btn green">
																	Create Service
																</button>
																&nbsp;
																<button type="button" className="btn default" onClick={() => this.props.push(Routes.backend.serviceList)}>
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

const mapStateToProps = ({serviceFormNew, userAuth}) => {
	return {serviceFormNew, userAuth};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...routerActions,
		...ServiceFormNewActions,
		...ThemeActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceNew);