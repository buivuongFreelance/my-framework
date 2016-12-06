import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import TabEdit from './partials/tabEdit';

import * as ThemeActions from '../theme/actions';
import * as SiteViewActions from './actions/view';
import * as SiteFormInfoActions from './actions/formInfo';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {CheckValidation} from '../common/helpers/check';

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
		this.props.siteFormInfoChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			const values = this.props.siteFormInfo.values;
				
			_this.props.themeShowLoadingEl(_this.refs.form);
			_this.props.siteFormSocialEditSubmit(values)
			.then(data => {
				_this.props.themeHideLoadingEl(_this.refs.form);
				_this.props.themeShowSuccess(`Update Successfully`);
				_this._refreshPage();
			})
			.catch(message => {
				_this.props.themeHideLoadingEl(_this.refs.form);
				_this.props.themeShowError(message);
			});
		}, 0);
	}
	_refreshPage(){
		this.props.push(Routes.backend.main);
		this.props.push({
			pathname: Routes.backend.siteSocial
		});
	}
	render(){
		return (
			<div className="page-content-wrapper" ref="detail">
				<PageHead title="Site Social"/>
				<PageContent>
					<Breadcrumb>
						<li>
							<span>Site Social</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="tabbable-line boxless tabbable-reversed">
									<TabEdit active="social"/>
									<div className="tab-content">
										<div className="tab-pane active">
											<div className="portlet box blue-hoki" ref="form">
												<div className="portlet-title">
													<div className="caption">
														Edit Site Social
													</div>
												</div>
												<div className="portlet-body form">
													<form method="POST" noValidation className="horizontal-form" onSubmit={this._onSubmit.bind(this)}>
														<div className="form-body">
															
															<div className="row">
																<div className="col-md-6">
																	<div className="form-group">
																		<label className="control-label">
																			<i className="fa fa-facebook"/> Facebook
																		</label>
																		<input type="text" placeholder="Link Facebook" className="form-control"
																			onChange={this._onChangeField.bind(this, 'facebook_link')}
																			onBlur={this._onChangeField.bind(this, 'facebook_link')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.facebook_link}/>
																	</div>
																</div>
																<div className="col-md-6">
																	<div className="form-group">
																		<label className="control-label">
																			<i className="fa fa-twitter"/> Twitter
																		</label>
																		<input type="text" placeholder="Link Twitter" className="form-control"
																			onChange={this._onChangeField.bind(this, 'twitter_link')}
																			onBlur={this._onChangeField.bind(this, 'twitter_link')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.twitter_link}/>
																	</div>
																</div>
															</div>

															<div className="row">
																<div className="col-md-6">
																	<div className="form-group">
																		<label className="control-label">
																			<i className="fa fa-google-plus"/> Google Plus
																		</label>
																		<input type="text" placeholder="Link GPlus" className="form-control"
																			onChange={this._onChangeField.bind(this, 'gplus_link')}
																			onBlur={this._onChangeField.bind(this, 'gplus_link')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.gplus_link}/>
																	</div>
																</div>
																<div className="col-md-6">
																	<div className="form-group">
																		<label className="control-label">
																			<i className="fa fa-youtube"/> Youtube
																		</label>
																		<input type="text" placeholder="Link Youtube" className="form-control"
																			onChange={this._onChangeField.bind(this, 'youtube_link')}
																			onBlur={this._onChangeField.bind(this, 'youtube_link')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.youtube_link}/>
																	</div>
																</div>
															</div>

															<div className="row">
																<div className="col-md-6">
																	<div className="form-group">
																		<label className="control-label">
																			<i className="fa fa-instagram"/> Instagram
																		</label>
																		<input type="text" placeholder="Link Instagram" className="form-control"
																			onChange={this._onChangeField.bind(this, 'instagram_link')}
																			onBlur={this._onChangeField.bind(this, 'instagram_link')}
																			onFocus={this._onFocusField.bind(this)}
																			value={this.props.siteFormInfo.values.instagram_link}/>
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
																				Edit Site Social
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