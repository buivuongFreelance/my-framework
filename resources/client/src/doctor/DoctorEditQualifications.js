import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import ImageUpload from '../common/components/imageUpload';
import Modal from '../common/components/modal';
import TabEdit from './partials/tabEdit';
import ConfirmModal from '../common/components/confirm';

import * as ThemeActions from '../theme/actions';
import * as QualificationFormNewActions from '../qualification/actions/formNew';
import * as QualificationViewActions from '../qualification/actions/view';
import * as DoctorViewActions from './actions/view';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';
import {CheckString, CheckEmpty, CheckObj} from '../common/helpers/check';

class DoctorEdit extends Component{
	constructor(){
		super();
		this.state = {
			modalAdd: false,
			modalEdit: false,
			confirm: false
		};
	}
	componentDidMount(){
		let _this = this;
		const query = this.props.location.query;

		this.props.themeShowLoadingEl(this.refs.detail);
		this.props.doctorViewDetail(query.uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this._loadListQualification();
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.themeShowError(message);
		});
	}
	componentWillUnmount(){
		this.props.qualificationFormNewClear();
	}
	_loadListQualification(){
		let _this = this;
		this.props.themeShowLoadingEl(this.refs.qualification);
		this.props.qualificationViewLoadListByDoctor(this.props.location.query)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.qualification);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.qualification);
			_this.props.themeShowError(message);
		});
	}
	_onChangeField(field, event){
		const value = (!CheckString(event) && event && !CheckObj(event)) ? event.target.value : event;
		let errors = Object.assign({}, this.props.qualificationFormNew.errors);
		switch(field){
			case 'name':
				if(CheckEmpty(value)){
					errors.name = 'Name Required.';
				}
				else
					errors.name = '';
				break;
		}
		this.props.qualificationFormNewValidation(errors);
		this.props.qualificationFormNewChange(field, value);
	}
	_onFocusField(){
		if(!this.props.qualificationFormNew.touched)
			this.props.qualificationFormNewFocus();
	}
	_refreshPage(){
		this.props.push(Routes.backend.main);
		this.props.push({
			pathname: Routes.backend.doctorEditQualifications,
			query: {uid: this.props.location.query.uid}
		});
	}
	_onCreateQualification(){
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			let values = $.extend({}, this.props.qualificationFormNew.values);
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

			const errors = this.props.qualificationFormNew.errors;
			let valid = true;
			for(let field in errors){
				let error = errors[field];
				if(error){
					valid = false;
					break;
				}
			}
			if(valid){
				let data = new FormData();
				data.append('image', this.props.qualificationFormNew.values.avatar);
				data.append('name', this.props.qualificationFormNew.values.name);
				data.append('description', this.props.qualificationFormNew.values.description);
				data.append('user_uid', this.props.location.query.uid);
				data.append('admin_uid', this.props.userAuth.uid);
				_this.props.themeShowLoadingEl(_this.refs.create);
				_this.props.qualificationFormNewSubmit(data)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.create);
					_this.setState({
						modalAdd: false
					});
					_this.props.qualificationFormNewClear();
					_this._loadListQualification();
				})
				.catch(message => {
					_this.props.themeHideLoadingEl(_this.refs.create);
					_this.props.themeShowError(message);
				});
			}
		}, 0);
	}
	_onAcceptUpdateQualification(){
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			let values = $.extend({}, this.props.qualificationFormNew.values);
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

			const errors = this.props.qualificationFormNew.errors;
			let valid = true;
			for(let field in errors){
				let error = errors[field];
				if(error){
					valid = false;
					break;
				}
			}
			if(valid){
				let data = new FormData();
				data.append('image', this.props.qualificationFormNew.values.avatar);
				data.append('name', this.props.qualificationFormNew.values.name);
				data.append('description', this.props.qualificationFormNew.values.description);
				data.append('uid', this.props.qualifications.selected.uid);
				_this.props.themeShowLoadingEl(_this.refs.edit);
				_this.props.qualificationFormEditSubmit(data)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.edit);
					_this.setState({
						modalEdit: false
					});
					_this.props.qualificationFormNewClear();
					_this._loadListQualification();
				})
				.catch(message => {
					_this.props.themeHideLoadingEl(_this.refs.edit);
					_this.props.themeShowError(message);
				});
			}
		}, 0);
	}
	_renderListQualifications(){
		if(this.props.qualifications.list.length === 0)
			return (
				<p>
					There is no qualifications here.
				</p>
			);
		else{
			return (
				<div className="mt-element-list">
					<div className="mt-list-container list-news ext-1" ref="list">
						<ul>
							{
								this.props.qualifications.list.map(qualification => {
									return (
										<li className="mt-list-item" key={qualification.uid}>
											<div className="list-thumb">
												<a>
													<img src={qualification.avatar ? DEFAULT_URL+'/storage/'+qualification.avatar: DEFAULT_URL+'/images/no_avatar.png'}/>
												</a>
											</div>
											<div className="list-item-content">
												<h3 className="uppercase">
													<a>{qualification.name}</a>
												</h3>
												<button type="button" className="btn btn-sm btn-primary"
													onClick={this._onUpdateQualification.bind(this, qualification)}>
													<i className="fa fa-pencil"/>
													Edit
												</button>
												&nbsp;
												<button type="button" className="btn btn-sm btn-default"
													onClick={this._onRemoveQualification.bind(this, qualification)}>
													<i className="fa fa-trash"/>
													Remove
												</button>
											</div>
										</li>
									);
								})
							}
						</ul>
					</div>
				</div>
			)
		}
	}
	_onRemoveQualification(qualification){
		this.props.qualificationViewSelected(qualification);
		this.setState({confirm: true});
	}
	_onUpdateQualification(qualification){
		this.props.qualificationViewSelected(qualification);
		this.props.qualificationFormEditFill(qualification);
		this.setState({modalEdit: true});
	}
	_onAcceptRemoveQualification(){
		let _this = this;
		const uid = this.props.qualifications.selected.uid;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.qualificationViewRemove(uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this._loadListQualification();
			_this.setState({
				confirm: false
			});
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this.props.themeShowError(message);
			_this.setState({
				confirm: false
			});
		});
	}
	render(){
		const {touched, errors} = this.props.qualificationFormNew;
		return (
			<div className="page-content-wrapper" ref="detail">
				<ConfirmModal message="Do you really want to remove this qualification?"
					modal={this.state.confirm}
					onAccept={this._onAcceptRemoveQualification.bind(this)}
					onRequestClose={()=>this.setState({confirm: false})}/>
				<Modal modal={this.state.modalAdd}>
					<div className="modal-header">
						<button type="button" className="close" onClick={() => this.setState({modalAdd: false})}>
							<span aria-hidden="true">&times;</span>
                			<span className="sr-only">Close</span>
						</button>
						<h4 className="modal-title">Add New Qualification</h4>
					</div>
					<div className="modal-body">
						<div className="horizontal-form" ref="create">
							<div className="form-body">
								
								<div className="row">
									<div className="col-md-6">
										<ImageUpload ref="imageUpload"
											onChange={(value) => this._onChangeField('avatar', value)}/>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className={(touched && errors.name) ? 'form-group has-error': 'form-group'}>
											<label className="control-label">
												Name
											</label>
											<input type="text" placeholder="Name" className="form-control"
												onChange={event =>  this._onChangeField('name', event.target.value)}
												onFocus={() => this._onFocusField()}/>
											{touched && errors.name && <span className="help-block">{errors.name}</span>}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label className="control-label">
												Description
											</label>
											<input type="text" placeholder="Description" className="form-control"
												onChange={event =>  this._onChangeField('description', event.target.value)}
												onFocus={() => this._onFocusField()}/>
										</div>
									</div>
								</div>

							</div>

						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary"
							onClick={() => this._onCreateQualification()}>Create New</button>
						<button type="button" className="btn btn-default"
							onClick={() => this.setState({modalAdd: false})}>Cancel</button>
					</div>
				</Modal>
				<Modal modal={this.state.modalEdit}>
					<div className="modal-header">
						<button type="button" className="close" onClick={() => this.setState({modalEdit: false})}>
							<span aria-hidden="true">&times;</span>
                			<span className="sr-only">Close</span>
						</button>
						<h4 className="modal-title">Edit Qualification</h4>
					</div>
					<div className="modal-body">
						<div className="horizontal-form" ref="edit">
							<div className="form-body">
								
								<div className="row">
									<div className="col-md-6">
										<ImageUpload ref="imageUpload"
											onChange={(value) => this._onChangeField('avatar', value)}
											imagePreview={this.props.qualifications.selected.avatar}/>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className={(touched && errors.name) ? 'form-group has-error': 'form-group'}>
											<label className="control-label">
												Name
											</label>
											<input type="text" placeholder="Name" className="form-control"
												onChange={event =>  this._onChangeField('name', event.target.value)}
												onFocus={() => this._onFocusField()}
												value={this.props.qualificationFormNew.values.name}/>
											{touched && errors.name && <span className="help-block">{errors.name}</span>}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label className="control-label">
												Description
											</label>
											<input type="text" placeholder="Description" className="form-control"
												onChange={event =>  this._onChangeField('description', event.target.value)}
												onFocus={() => this._onFocusField()}
												value={this.props.qualificationFormNew.values.description}/>
										</div>
									</div>
								</div>

							</div>

						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary"
							onClick={() => this._onAcceptUpdateQualification()}>Accept</button>
						<button type="button" className="btn btn-default"
							onClick={() => this.setState({modalEdit: false})}>Cancel</button>
					</div>
				</Modal>
				<PageHead title={'Doctor '+this.props.doctor.first_name+' '+this.props.doctor.last_name}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.doctorList)}>Doctor List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>{this.props.doctor.first_name+' '+this.props.doctor.last_name}</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="tabbable-line boxless tabbable-reversed">
									<TabEdit uid={this.props.location.query.uid} active="qualifications"/>
									<div className="tab-content">
										<div className="tab-pane active">
											<div className="portlet box blue-hoki" ref="form">
												<div className="portlet-title">
													<div className="caption">
														Qualifications
													</div>
													<div className="actions">
														<a className="btn btn-default btn-sm"
															onClick={()=>this.setState({modalAdd: true})}>
															<i className="fa fa-plus"/> Add
														</a>
													</div>
												</div>
												<div className="portlet-body" ref="qualification">
													{this._renderListQualifications()}
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

const mapStateToProps = ({doctor, qualificationFormNew, userAuth, qualifications}) => {
	return {doctor, qualificationFormNew, userAuth, qualifications};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...QualificationFormNewActions,
		...QualificationViewActions,
		...DoctorViewActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorEdit);