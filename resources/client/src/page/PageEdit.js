import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import RichEditor from '../common/components/richEditor';

import * as PageFormNewActions from '../page/actions/formNew';
import * as PageViewActions from './actions/view';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {CheckString, CheckEmpty} from '../common/helpers/check';

class PageEdit extends Component{
	componentWillUnmount(){
		this.props.pageFormNewClear();
		this.props.pageViewClear();
	}
	componentDidMount(){
		let _this = this;
		const query = this.props.location.query;

		this.props.themeShowLoadingEl(this.refs.form);
		this.props.pageViewDetail(query.uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.form);
			_this.props.pageFormEditFill(_this.props.page);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.form);
			_this.props.themeShowError(message);
		});
	}
	_onFocusField(){
		if(!this.props.pageFormNew.touched)
			this.props.pageFormNewFocus();
	}
	_onChangeField(field, event){
		const value = (!CheckString(event) && event) ? event.target.value : event;
		let errors = Object.assign({}, this.props.pageFormNew.errors);
		switch(field){
			case 'name':
				if(CheckEmpty(value))
					errors.name = 'Name Required.';
				else
					errors.name = '';
				break;
		}
		this.props.pageFormNewValidation(errors);
		this.props.pageFormNewChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			let values = $.extend({}, this.props.pageFormNew.values);
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

			const errors = this.props.pageFormNew.errors;
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
				_this.props.pageFormEditSubmit(values)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowSuccess('Create New Page Successfully');
					_this.props.push(Routes.backend.pageList);
				})
				.catch(message => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowError(message);
				});
			}
		}, 0);
	}
	render(){
		const {touched, errors} = this.props.pageFormNew;
		return (
			<div className="page-content-wrapper">
				<PageHead title={'Edit Page'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.pageList)}>Page List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>{this.props.page.name}</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="portlet box blue-hoki" ref="form">
									<div className="portlet-title">
										<div className="caption">
											Edit Page {this.props.page.name}
										</div>
									</div>
									<div className="portlet-body form">
										<form method="POST" noValidation className="horizontal-form" onSubmit={this._onSubmit.bind(this)}>
											<div className="form-body">
												
												<div className="row">
													<div className="col-md-6">
														<div className={(touched && errors.name) ? 'form-group has-error': 'form-group'}>
															<label className="control-label">
																Page Name
															</label>
															<input type="text" placeholder="Page Name" className="form-control"
																onChange={this._onChangeField.bind(this, 'name')}
																onBlur={this._onChangeField.bind(this, 'name')}
																onFocus={this._onFocusField.bind(this)}
																value={this.props.pageFormNew.values.name}/>
															{touched && errors.name && <span className="help-block">{errors.name}</span>}
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">
																SEO Title
															</label>
															<input type="text" placeholder="SEO Title" className="form-control"
																onChange={this._onChangeField.bind(this, 'seo_title')}
																onBlur={this._onChangeField.bind(this, 'seo_title')}
																onFocus={this._onFocusField.bind(this)}
																value={this.props.pageFormNew.values.seo_title}/>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-md-12">
														<div className="form-group">
															<label className="control-label">
																Page Content
															</label>
															<RichEditor
																onChange={this._onChangeField.bind(this, 'content')}
																onFocus={this._onFocusField.bind(this)}
																value={this.props.page.content}/>
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
																	Edit Page
																</button>
																&nbsp;
																<button type="button" className="btn default" onClick={() => this.props.push(Routes.backend.pageList)}>
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

const mapStateToProps = ({pageFormNew, userAuth, page}) => {
	return {pageFormNew, userAuth, page};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...routerActions,
		...PageFormNewActions,
		...PageViewActions,
		...ThemeActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageEdit);