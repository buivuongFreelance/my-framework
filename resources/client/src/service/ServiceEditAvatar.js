import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import ImageUpload from '../common/components/imageUpload';
import TabEdit from './partials/tabEdit';

import * as ThemeActions from '../theme/actions';
import * as ServiceViewActions from './actions/view';
import * as ServiceFormAvatarActions from './actions/formAvatar';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';

class ServiceEdit extends Component{
	componentDidMount(){
		let _this = this;
		const query = this.props.location.query;

		this.props.themeShowLoadingEl(this.refs.detail);
		this.props.serviceViewDetail(query.uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.themeShowError(message);
		});
	}
	componentWillUnmount(){
		this.props.serviceFormAvatarClear();
		this.props.serviceViewClear();
	}
	_uploadAvatar(event){
		event.preventDefault();
		let _this = this;
		const avatar = this.props.serviceFormAvatar.values.avatar;
		if(avatar){
			let data = new FormData();
			data.append('image', avatar);
			data.append('uid', this.props.location.query.uid);
			this.props.themeShowLoadingEl(this.refs.form);
			this.props.serviceFormAvatarUpload(data)
			.then(data => {
				_this.props.themeHideLoadingEl(_this.refs.form);
				_this.props.themeShowSuccess('Upload Service Avatar Successfully');
				_this._refreshPage();
			})
			.catch(message => {
				_this.props.themeHideLoadingEl(_this.refs.form);
				_this.props.themeShowError(message);
			});
		}else{
			this.props.themeShowError('Please Select An Avatar');
		}
	}
	_refreshPage(){
		this.props.push(Routes.backend.main);
		this.props.push({
			pathname: Routes.backend.serviceEditAvatar,
			query: {uid: this.props.location.query.uid}
		});
	}
	render(){
		return (
			<div className="page-content-wrapper" ref="detail">
				<PageHead title={'Service '+this.props.service.name}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.serviceList)}>Service List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>{this.props.service.name}</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="tabbable-line boxless tabbable-reversed">
									<TabEdit uid={this.props.location.query.uid} active="avatar"/>
									<div className="tab-content">
										<div className="tab-pane active">
											<div className="portlet box blue-hoki" ref="form">
												<div className="portlet-title">
													<div className="caption">
														Avatar
													</div>
												</div>
												<div className="portlet-body form">
													<form method="POST" noValidation className="form-horizontal" encType="multipart/form-data">
														<div className="form-body">
															
															<div className="row">
																<div className="col-md-12">
																	<label className="col-md-3 control-label">
																		Avatar
																	</label>
																	<div className="col-md-9">
																		<ImageUpload ref="imageUpload" 
																			imagePreview={this.props.service.avatar}
																			onChange={value => this.props.serviceFormAvatarChange('avatar', value)}/>
																	</div>
																</div>
															</div>

														</div>

														<div className="form-actions">
															<div className="row">
																<div className="col-md-6">
																	<div className="row">
																		<div className="col-md-offset-3 col-md-9">
																			<button type="submit" className="btn green" onClick={this._uploadAvatar.bind(this)}>
																				Upload
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
	}
};

const mapStateToProps = ({service, serviceFormAvatar}) => {
	return {service, serviceFormAvatar};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...ServiceViewActions,
		...ServiceFormAvatarActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEdit);