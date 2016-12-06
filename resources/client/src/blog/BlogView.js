import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import Pagination from '../common/components/pagination';
import ConfirmModal from '../common/components/confirm';

import * as BlogActions from './actions/view';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';
import {GetOffsetPage} from '../common/helpers';

class BlogView extends Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		}
	}
	componentDidMount(){
		this._loadListBlog();
	}
	componentWillUnmount(){
		this.props.blogViewClear();
	}
	_loadListBlog(){
		let _this = this;
		const pagination = this.props.blogs.pagination;
		const search = this.props.blogs.search;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.blogViewLoadList(pagination.offset, pagination.limit, search)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this.props.themeShowError(message);
		});
	}
	_onGoToDetail(blog){
		this.props.push({
			pathname: Routes.backend.blogEditAvatar,
			query: {uid: blog.uid}
		});
	}
	_onChangePage(page){
		const offset = GetOffsetPage(page);
		this.props.blogViewChangePage(page, offset);
		this._loadListBlog();
	}
	_onKeyDown(event){
		if(event.key === 'Enter'){
			this._loadListBlog();
		}
	}
	_renderList(){
		if(this.props.blogs.list.length === 0){
			return (
				<div className="col-md-12">
					There is no blog here.
				</div>
			);
		}else{
			return (
				this.props.blogs.list.map(blog => {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={blog.uid}>
							<div className="mt-card-item">
								<div className="mt-card-avatar mt-overlay-1">
									<img src={blog.avatar ? DEFAULT_URL+'/storage/'+blog.avatar: DEFAULT_URL+'/images/no_avatar.png'}/>
								</div>
								<div className="mt-card-content">
									<h3 className="mt-card-name">{`${blog.name}`}</h3>
									<p className="mt-card-desc font-grey-mint">{blog.description}</p>
								</div>
								<div className="mt-card-content">
									<button className="btn btn-sm btn-primary"
										onClick={this._onGoToDetail.bind(this, blog)}>Edit</button>
									&nbsp;
									<button className="btn btn-sm btn-default" onClick={this._onRemove.bind(this, blog)}>Remove</button>
								</div>
							</div>
						</div>
					);
				})
			)
		}
	}
	_onResetSearch(){
		let _this = this;
		this.props.blogViewResetSearch();
		setTimeout(()=>{
			this._loadListBlog();
		}, 0)
	}
	_onRemove(page){
		this.props.blogViewSelected(page);
		this.setState({confirm: true});
	}
	_onAcceptRemove(){
		let _this = this;
		const uid = this.props.blogs.selected.uid;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.blogViewRemove(uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this._loadListBlog();
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
		return(
			<div className="page-content-wrapper">
				<ConfirmModal message="Do you really want to remove this blog?"
					modal={this.state.confirm}
					onAccept={this._onAcceptRemove.bind(this)}
					onRequestClose={()=>this.setState({confirm: false})}/>
				<PageHead title={'Blog List'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<span>Blog List</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet light portlet-fit" ref="list">
									<div className="portlet-title">
										<div className="caption">
											Blog List
										</div>
										<div className="actions">
											<a className="btn btn-default btn-sm" onClick={() => this.props.blogViewToggleSearch()}>
												<i className="fa fa-search"/> Search
											</a>
											&nbsp;
											<a className="btn btn-default btn-sm"
												onClick={() => this.props.push(Routes.backend.blogNew)}>
												<i className="fa fa-plus"/> New Blog
											</a>
										</div>
									</div>
									<div className="portlet-title" style={{display: this.props.blogs.displaySearch ? 'block': 'none'}}>
										<div className="form-horizontal">
											<div className="form-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																Name
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Name" className="form-control"
																	value={this.props.blogs.search.name}
																	onChange={(event) => this.props.blogViewChangeSearch('name', event.target.value)}
																	onKeyDown={this._onKeyDown.bind(this)}/>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="form-actions">
												<div className="row">
													<div className="col-md-6">
														<div className="row">
															<div className="col-md-offset-3 col-md-9">
																<button type="button" className="btn green" onClick={this._onResetSearch.bind(this)}>
																	Reset
																</button>
																&nbsp;
																<button type="button" className="btn default" onClick={() => this.props.blogViewToggleSearch()}>
																	Close
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="portlet-body">
										<div className="mt-element-card mt-card-round mt-element-overlay">
											<div className="row">
												{this._renderList()}
											</div>
										</div>
									</div>
									<div className="portlet-body">
										<div className="search-page">
											<Pagination totalPages={this.props.blogs.pagination.totalPages}
												onChange={this._onChangePage.bind(this)}/>
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

const mapStateToProps = ({blogs}) => {
	return {blogs};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...BlogActions,
		...ThemeActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogView);