import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import TabEdit from './partials/tabEdit';
import RichEditor from '../common/components/richEditor';

import * as ThemeActions from '../theme/actions';
import * as BlogFormNewActions from './actions/formNew';
import * as BlogViewActions from './actions/view';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {CheckString, CheckEmpty, CheckArray} from '../common/helpers/check';

class BlogEditInfo extends Component{
	componentDidMount(){
		let _this = this;
		const query = this.props.location.query;

		this.props.themeShowLoadingEl(this.refs.detail);
		this.props.blogViewDetail(query.uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.blogFormEditFill(_this.props.blog);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.themeShowError(message);
		});
	}
	componentWillUnmount(){
		this.props.blogFormNewClear();
		this.props.blogViewClear();
	}
	_onFocusField(){
		if(!this.props.blogFormNew.touched)
			this.props.blogFormNewFocus();
	}
	_onChangeField(field, event){
		const value = (!CheckString(event) && event && !CheckArray(event)) ? event.target.value : event;
		let errors = Object.assign({}, this.props.blogFormNew.errors);
		switch(field){
			case 'name':
				if(CheckEmpty(value))
					errors.name = 'Name Required.';
				else
					errors.name = '';
				break;
		}
		this.props.blogFormNewValidation(errors);
		this.props.blogFormNewChange(field, value);
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;
		setTimeout(() => {
			_this._onFocusField();
			const values = this.props.blogFormNew.values;
			for(let field in values){
				let value = values[field];
				_this._onChangeField(field, value);
			}

			const errors = this.props.blogFormNew.errors;
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
				_this.props.blogFormEditSubmit(values)
				.then(data => {
					_this.props.themeHideLoadingEl(_this.refs.form);
					_this.props.themeShowSuccess(`Update Blog ${_this.props.blog.name} Successfully`);
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
			pathname: Routes.backend.blogEditInfo,
			query: {uid: this.props.location.query.uid}
		});
	}
	render(){
		const blogName = `${this.props.blog.name}`;
		const {touched, errors} = this.props.blogFormNew;
		return (
			<div className="page-content-wrapper" ref="detail">
				<PageHead title={`Blog ${blogName}`}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.blogList)}>Blog List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>{blogName}</span>
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
														Edit {blogName}
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
																			value={this.props.blogFormNew.values.name}/>
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
																			value={this.props.blogFormNew.values.description}/>
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
																			value={this.props.blog.content}/>
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
																				Edit Blog
																			</button>
																			&nbsp;
																			<button type="button" className="btn default" onClick={() => this.props.push(Routes.backend.blogList)}>
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

const mapStateToProps = ({blog, blogFormNew}) => {
	return {blog, blogFormNew};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...BlogViewActions,
		...BlogFormNewActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditInfo);