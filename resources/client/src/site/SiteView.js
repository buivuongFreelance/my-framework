import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import TabEdit from './partials/tabEdit';
import ImageUpload from '../common/components/imageUpload';

import * as ThemeActions from '../theme/actions';
import * as SiteViewActions from './actions/view';
import * as SiteFormInfoActions from './actions/formInfo';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {CheckValidation, CheckEmpty, CheckEmail} from '../common/helpers/check';

class SiteView extends Component{
	componentDidMount(){
		let _this = this;

		this.props.themeShowLoadingEl(this.refs.detail);
		this.props.siteViewDetail()
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.siteFormInfoFill(_this.props.site);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.themeShowError(message);
		});
	}
	componentWillUnmount(){
		this.props.siteFormInfoClear();
		this.props.siteViewClear();
	}
	_onFocusField(){
		if(!this.props.siteFormInfo.touched)
			this.props.siteFormInfoFocus();
	}
	_onChangeField(field, event){
		const value = CheckValidation(event) ? event.target.value : event;
		let errors = Object.assign({}, this.props.siteFormInfo.errors);
		switch(field){
			case 'name':
				if(CheckEmpty(value))
					errors.name = 'Name Required.';
				else
					errors.name = '';
				break;
			case 'email':
				if(CheckEmpty(value))
					errors.email = 'Email Required.';
				else if(!CheckEmail(value))
					errors.email = 'Email Must Be Correct';
				else
					errors.email = '';
				break;
			case 'address':
				if(CheckEmpty(value))
					errors.address = 'Address Required.';
				else
					errors.address = '';
				break;
			case 'phone':
				if(CheckEmpty(value))
					errors.phone = 'Phone Required.';
				else
					errors.phone = '';
				break;
		}
		this.props.siteFormInfoValidation(errors);
		this.props.siteFormInfoChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			const values = this.props.siteFormInfo.values;
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

			const errors = this.props.siteFormInfo.errors;
			let valid = true;
			for(let field in errors){
				let error = errors[field];
				if(error){
					valid = false;
					break;
				}
			}
			if(valid){
				let formData = new FormData();
				formData.append('uid', values.uid);
				formData.append('image', values.avatar);
				formData.append('name', values.name);
				formData.append('email', values.email);
				formData.append('address', values.address);
				formData.append('phone', values.phone);

				_this.props.themeShowLoadingEl(_this.refs.form);
				_this.props.siteFormInfoEditSubmit(formData)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowSuccess(`Update Successfully`);
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
			pathname: Routes.backend.siteView
		});
	}
	render(){
		const {touched, errors} = this.props.siteFormInfo;
		return (
			<div className="page-content-wrapper" ref="detail">
				<PageHead title="Site View"/>
				<PageContent>
					<Breadcrumb>
						<li>
							<span>Site View</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="tabbable-line boxless tabbable-reversed">
									<TabEdit active="info"/>
									<div className="tab-content">
										<div className="tab-pane active">
											<div className="portlet box blue-hoki" ref="form">
												<div className="portlet-title">
													<div className="caption">
														Edit Site Info
													</div>
												</div>
												<div className="portlet-body form">
													<form method="POST" noValidation className="horizontal-form" onSubmit={this._onSubmit.bind(this)}>
														<div className="form-body">
															
															<div className="row">
																<div className="col-md-6">
																	<div className={(touched && errors.name) ? 'form-group has-error': 'form-group'}>
																		<label className="control-label">
																			Site Name
																		</label>
																		<input type="text" placeholder="Site Name" className="form-control"
																			onChange={this._onChangeField.bind(this, 'name')}
																			onBlur={this._onChangeField.bind(this, 'name')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.name}/>
																		{touched && errors.name && <span className="help-block">{errors.name}</span>}
																	</div>
																</div>
																<div className="col-md-6">
																	<div className={(touched && errors.email) ? 'form-group has-error': 'form-group'}>
																		<label className="control-label">
																			Site Email
																		</label>
																		<input type="text" placeholder="Site Email" className="form-control"
																			onChange={this._onChangeField.bind(this, 'email')}
																			onBlur={this._onChangeField.bind(this, 'email')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.email}/>
																		{touched && errors.email && <span className="help-block">{errors.email}</span>}
																	</div>
																</div>
															</div>

															<div className="row">
																<div className="col-md-6">
																	<div className={(touched && errors.phone) ? 'form-group has-error': 'form-group'}>
																		<label className="control-label">
																			Site Phone
																		</label>
																		<input type="text" placeholder="Site Phone" className="form-control"
																			onChange={this._onChangeField.bind(this, 'phone')}
																			onBlur={this._onChangeField.bind(this, 'phone')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.phone}/>
																		{touched && errors.phone && <span className="help-block">{errors.phone}</span>}
																	</div>
																</div>
																<div className="col-md-6">
																	<div className={(touched && errors.address) ? 'form-group has-error': 'form-group'}>
																		<label className="control-label">
																			Site Address
																		</label>
																		<input type="text" placeholder="Site Address" className="form-control"
																			onChange={this._onChangeField.bind(this, 'address')}
																			onBlur={this._onChangeField.bind(this, 'address')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.address}/>
																		{touched && errors.address && <span className="help-block">{errors.address}</span>}
																	</div>
																</div>
															</div>

															<div className="row">
																<div className="col-md-12">
																	<div className="form-group">
																		<label className="control-label">
																			Site Logo
																		</label>
																		<br/>
																		<ImageUpload ref="imageUpload" 
																			imagePreview={this.props.site.avatar}
																			onChange={value => this._onChangeField('avatar', value)}/>
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
																				Edit Site Info
																			</button>
																			&nbsp;
																			<button type="button" className="btn default" onClick={() => this.props.siteFormInfoFill(this.props.site)}>
																				Refresh Info
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

const mapStateToProps = ({site, siteFormInfo}) => {
	return {site, siteFormInfo};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...SiteFormInfoActions,
		...SiteViewActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteView);