import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';

import * as CatFaqFormNewActions from '../catFaq/actions/formNew';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {CheckString, CheckEmpty} from '../common/helpers/check';

class CatFaqNew extends Component{
	componentWillUnmount(){
		this.props.catFaqFormNewClear();
	}
	_onFocusField(){
		if(!this.props.catFaqFormNew.touched)
			this.props.catFaqFormNewFocus();
	}
	_onChangeField(field, event){
		const value = (!CheckString(event) && event) ? event.target.value : event;
		let errors = Object.assign({}, this.props.catFaqFormNew.errors);
		switch(field){
			case 'name':
				if(CheckEmpty(value))
					errors.name = 'Name Required.';
				else
					errors.name = '';
				break;
		}
		this.props.catFaqFormNewValidation(errors);
		this.props.catFaqFormNewChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			let values = $.extend({}, this.props.catFaqFormNew.values);
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

			const errors = this.props.catFaqFormNew.errors;
			let valid = true;
			for(let field in errors){
				let error = errors[field];
				if(error){
					valid = false;
					break;
				}
			}
			if(valid){
				values.user_uid = this.props.userAuth.uid;
				_this.props.themeShowLoadingEl(_this.refs.form);
				_this.props.catFaqFormNewSubmit(values)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowSuccess('Create New CatFaq Successfully');
					_this.props.push(Routes.backend.catFaqList);
				})
				.catch(message => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowError(message);
				});
			}
		}, 0);
	}
	render(){
		const {touched, errors} = this.props.catFaqFormNew;
		return (
			<div className="catFaq-content-wrapper">
				<PageHead title={'New CatFaq'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.catFaqList)}>CatFaq List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>New CatFaq</span>
						</li>
					</Breadcrumb>
					<div className="catFaq-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="portlet box blue-hoki" ref="form">
									<div className="portlet-title">
										<div className="caption">
											Add A New CatFaq
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

											</div>

											<div className="form-actions">
												<div className="row">
													<div className="col-md-12">
														<div className="row">
															<div className="col-md-9">
																<button type="submit" className="btn green">
																	Create CatFaq
																</button>
																&nbsp;
																<button type="button" className="btn default" onClick={() => this.props.push(Routes.backend.catFaqList)}>
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

const mapStateToProps = ({catFaqFormNew, userAuth}) => {
	return {catFaqFormNew, userAuth};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...routerActions,
		...CatFaqFormNewActions,
		...ThemeActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CatFaqNew);