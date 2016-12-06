import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import TabEdit from './partials/tabEdit';
import RichEditor from '../common/components/richEditor';

import * as ThemeActions from '../theme/actions';
import * as ServiceFormNewActions from './actions/formNew';
import * as ServiceViewActions from './actions/view';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {CheckString, CheckEmpty, CheckArray} from '../common/helpers/check';

class ServiceEditInfo extends Component{
	componentDidMount(){
		let _this = this;
		const query = this.props.location.query;

		this.props.themeShowLoadingEl(this.refs.detail);
		this.props.serviceViewDetail(query.uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.serviceFormEditFill(_this.props.service);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.themeShowError(message);
		});
	}
	componentWillUnmount(){
		this.props.serviceFormNewClear();
		this.props.serviceViewClear();
	}
	_onFocusField(){
		if(!this.props.serviceFormNew.touched)
			this.props.serviceFormNewFocus();
	}
	_onChangeField(field, event){
		const value = (!CheckString(event) && event && !CheckArray(event)) ? event.target.value : event;
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
			const values = this.props.serviceFormNew.values;
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
				_this.props.themeShowLoadingEl(_this.refs.form);
				_this.props.serviceFormEditSubmit(values)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowSuccess(`Update Service ${_this.props.service.name} Successfully`);
					_this._refreshPage();
				})
				.catch(message => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowError(message);
				});
			}
		}, 0);
	}
	_refreshPage(){
		this.props.push(Routes.backend.main);
		this.props.push({
			pathname: Routes.backend.serviceEditInfo,
			query: {uid: this.props.location.query.uid}
		});
	}
	render(){
		const serviceName = `${this.props.service.name}`;
		const {touched, errors} = this.props.serviceFormNew;
		return (
			<div className="page-content-wrapper" ref="detail">
				<PageHead title={`Service ${serviceName}`}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.serviceList)}>Service List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>{serviceName}</span>
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
														Edit {serviceName}
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
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.serviceFormNew.values.name}/>
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
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.serviceFormNew.values.description}/>
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
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.service.content}/>
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
																				Edit Service
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

							</div>
						</div>
					</div>
				</PageContent>
			</div>
		);
	};
};

const mapStateToProps = ({service, serviceFormNew}) => {
	return {service, serviceFormNew};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...ServiceViewActions,
		...ServiceFormNewActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEditInfo);