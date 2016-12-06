import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import ImageUpload from '../common/components/imageUpload';

import * as SlideshowFormNewActions from '../slideshow/actions/formNew';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {CheckValidation, CheckEmpty} from '../common/helpers/check';

class SlideshowNew extends Component{
	componentWillUnmount(){
		this.props.slideshowFormNewClear();
	}
	_onFocusField(){
		if(!this.props.slideshowFormNew.touched)
			this.props.slideshowFormNewFocus();
	}
	_onChangeField(field, event){
		const value = CheckValidation(event) ? event.target.value : event;
		let errors = Object.assign({}, this.props.slideshowFormNew.errors);
		switch(field){
			case 'name':
				if(CheckEmpty(value))
					errors.name = 'Name Required.';
				else
					errors.name = '';
				break;
		}
		this.props.slideshowFormNewValidation(errors);
		this.props.slideshowFormNewChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			let values = $.extend({}, this.props.slideshowFormNew.values);
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

			const errors = this.props.slideshowFormNew.errors;
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
				formData.append('image', values.avatar);
				formData.append('name', values.name);
				formData.append('description', values.description);
				formData.append('user_uid', this.props.userAuth.uid);

				_this.props.themeShowLoadingEl(_this.refs.form);
				_this.props.slideshowFormNewSubmit(formData)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowSuccess('Create New Slideshow Successfully');
					_this.props.push(Routes.backend.slideshowList);
				})
				.catch(message => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowError(message);
				});
			}
		}, 0);
	}
	render(){
		const {touched, errors} = this.props.slideshowFormNew;
		return (
			<div className="slideshow-content-wrapper">
				<PageHead title={'New Slideshow'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.slideshowList)}>Slideshow List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>New Slideshow</span>
						</li>
					</Breadcrumb>
					<div className="slideshow-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="portlet box blue-hoki" ref="form">
									<div className="portlet-title">
										<div className="caption">
											Add A New Slideshow
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
																Image Slideshow
															</label>
															<br/>
															<ImageUpload ref="imageUpload" 
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
																	Create Slideshow
																</button>
																&nbsp;
																<button type="button" className="btn default" onClick={() => this.props.push(Routes.backend.slideshowList)}>
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

const mapStateToProps = ({slideshowFormNew, slideshow, userAuth}) => {
	return {slideshowFormNew, slideshow, userAuth};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...routerActions,
		...SlideshowFormNewActions,
		...ThemeActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideshowNew);