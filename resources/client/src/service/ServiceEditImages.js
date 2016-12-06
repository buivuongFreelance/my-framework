import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import TabEdit from './partials/tabEdit';
import MultipleImageUpload from '../common/components/multipleImageUpload';
import ConfirmModal from '../common/components/confirm';

import * as ThemeActions from '../theme/actions';
import * as ServiceViewActions from './actions/view';
import * as ServiceFormImagesActions from './actions/formImages';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';
import {GetFilesUpload} from '../common/helpers';

class ServiceEdit extends Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		}
	}
	componentDidMount(){
		let _this = this;
		const query = this.props.location.query;

		this.props.themeShowLoadingEl(this.refs.detail);
		this.props.serviceViewDetail(query.uid)
		.then(data => {
			_this.props.serviceFormImagesFill(data.services_images);
			_this.props.themeHideLoadingEl(_this.refs.detail);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.themeShowError(message);
		});
	}
	componentWillUnmount(){
		this.props.serviceFormImagesClear();
		this.state = {
			confirm: false
		}
	}
	_loopCallbackImages(i, files){
		let _this = this;
		if(i < files.length){
			let file = files[i];
			let data = new FormData();
			const imageWrapper = document.getElementById(file.lastModified);
			data.append('image', file);
			data.append('uid', this.props.location.query.uid);
			this.props.themeShowLoadingEl(imageWrapper);
			this.props.serviceFormImagesUpload(data)
			.then(data => {
				_this.props.themeHideLoadingEl(imageWrapper);
				_this._loopCallbackImages(i+1, files);
			})
			.catch(message => {
				_this.props.themeShowError('One Of Your Image Not Upload');
				_this.props.themeHideLoadingEl(imageWrapper);
				_this._refreshPage();
			});
		}else{
			_this.props.push(Routes.backend.main);
			_this.props.push({
				pathname: Routes.backend.serviceEditImages,
				query: {uid: _this.props.location.query.uid}
			});
		}
	}
	_onRemoveServerImage(image){
		this.props.serviceFormImagesChoose(image);
		this.setState({confirm: true});
	}
	_onUploadAll(event){
		event.preventDefault();
		let _this = this;
		const images = GetFilesUpload(this.props.serviceFormImages.values.images);
		if(images.length === 0){
			this.props.themeShowError('Please Select Images');
		}else{
			this._loopCallbackImages(0, images);
		}
	}
	_onUploadRemove(){
		let _this = this;
		this.setState({
			confirm: false
		});
		const image = this.props.serviceFormImages.image;
		const imageWrapper = document.getElementById(image.id);
		this.props.themeShowLoadingEl(imageWrapper);
		this.props.serviceFormImagesRemove(image.id)
		.then(data => {
			_this.props.themeHideLoadingEl(imageWrapper);
			_this._refreshPage();
		})
		.catch(message => {
			_this.props.themeShowError('Cannot delete this images');
			_this.props.themeHideLoadingEl(imageWrapper);
		});
	}
	_refreshPage(){
		this.props.push(Routes.backend.main);
		this.props.push({
			pathname: Routes.backend.serviceEditImages,
			query: {uid: this.props.location.query.uid}
		});
	}
	render(){
		return (
			<div className="page-content-wrapper" ref="detail">
				<ConfirmModal message="Do you really want to remove this image?"
					modal={this.state.confirm}
					onAccept={this._onUploadRemove.bind(this)}
					onRequestClose={()=>this.setState({confirm: false})}/>
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
									<TabEdit uid={this.props.location.query.uid} active="uploads"/>
									<div className="tab-content">
										<div className="tab-pane active">
											<form method="POST" noValidation encType="multipart/form-data" ref="form">
												<div className="form-body">
													<MultipleImageUpload
														onChange={images => this.props.serviceFormImagesChange('images', images)}
														onRemove={this._onRemoveServerImage.bind(this)}
														images={this.props.serviceFormImages.values.images}/>
												</div>
												<div className="form-actions">
													<div className="row">
														<div className="col-md-6">
															<div className="row">
																<div className="col-md-9">
																	<button type="submit" className="btn green" onClick={this._onUploadAll.bind(this)}>
																		Upload All
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
				</PageContent>
			</div>
		);
	}
};

const mapStateToProps = ({service, serviceFormImages}) => {
	return {service, serviceFormImages};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...ServiceViewActions,
		...ServiceFormImagesActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEdit);