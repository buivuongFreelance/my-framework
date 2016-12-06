import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import Pagination from '../common/components/pagination';
import ConfirmModal from '../common/components/confirm';

import * as PagesActions from '../page/actions/view';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';
import {GetOffsetPage, DisplayDateTime} from '../common/helpers';

class pageView extends Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		}
	}
	componentDidMount(){
		this._loadList();
	}
	componentWillUnmount(){
		this.props.pageViewClear();
	}
	_loadList(){
		let _this = this;
		const pagination = this.props.pages.pagination;
		const search = this.props.pages.search;
		const sort = this.props.pages.sort;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.pageViewLoadList(pagination.offset, pagination.limit, search, sort)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this.props.themeShowError(message);
		});
	}
	_onGoToDetail(page){
		this.props.push({
			pathname: Routes.backend.pageEdit,
			query: {uid: page.uid}
		});
	}
	_onChangePage(page){
		const offset = GetOffsetPage(page);
		this.props.pageViewChangePage(page, offset);
		this._loadList();
	}
	_onKeyDown(event){
		if(event.key === 'Enter'){
			this._loadList();
		}
	}
	_onSort(field){
		let _this = this;
		const currentField = this.props.pages.sort.field;
		let value = this.props.pages.sort.value;
		if(currentField === field)
			value = this.props.pages.sort.value === 'desc'?'asc':'desc';
		this.props.pageViewSort(field, value);
		setTimeout(()=>{
			_this._loadList();
		}, 0)
	}
	_renderList(){
		if(this.props.pages.list.length === 0)
			return (
				<p>
					There is no page here.
				</p>
			);
		else{
			return (
				<table className="table table-bordered table-striped table-condensed">
					<thead className="bg-blue">
						<tr>
							<th><a onClick={this._onSort.bind(this, 'name')}>Name <i className="fa fa-sort"/></a></th>
							<th><a onClick={this._onSort.bind(this, 'slug')}>Slug <i className="fa fa-sort"/></a></th>
							<th><a onClick={this._onSort.bind(this, 'seo_title')}>SEO Title <i className="fa fa-sort"/></a></th>
							<th><a onClick={this._onSort.bind(this, 'created_at')}>Created At <i className="fa fa-sort"/></a></th>
							<th><a>Actions</a></th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.pages.list.map(page => {
								return (
									<tr key={page.uid}>
										<td className="table-title">{page.name}</td>
										<td className="table-title">{page.slug}</td>
										<td className="table-title">{page.seo_title}</td>
										<td className="table-date font-blue">{DisplayDateTime(page.created_at)}</td>
										<td className="table-title">
											<a onClick={this._onGoToDetail.bind(this, page)}><i className="fa fa-pencil"/></a>
											&nbsp;
											<a onClick={this._onRemovePage.bind(this, page)}><i className="fa fa-trash"/></a>
										</td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			)
		}
	}
	_onResetSearch(){
		let _this = this;
		this.props.pageViewResetSearch();
		setTimeout(()=>{
			this._loadList();
		}, 0)
	}
	_onRemovePage(page){
		this.props.pageViewSelected(page);
		this.setState({confirm: true});
	}
	_onAcceptRemovePage(){
		let _this = this;
		const uid = this.props.pages.selected.uid;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.pageViewRemove(uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this._loadList();
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
				<ConfirmModal message="Do you really want to remove this page?"
					modal={this.state.confirm}
					onAccept={this._onAcceptRemovePage.bind(this)}
					onRequestClose={()=>this.setState({confirm: false})}/>
				<PageHead title={'Page List'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<span>Page List</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet light portlet-fit" ref="list">
									<div className="portlet-title">
										<div className="caption">
											Page List
										</div>
										<div className="actions">
											<a className="btn btn-default btn-sm" onClick={() => this.props.pageViewToggleSearch()}>
												<i className="fa fa-search"/> Search
											</a>
											&nbsp;
											<a className="btn btn-default btn-sm"
												onClick={() => this.props.push(Routes.backend.pageNew)}>
												<i className="fa fa-plus"/> New Page
											</a>
										</div>
									</div>
									<div className="portlet-title" style={{display: this.props.pages.displaySearch ? 'block': 'none'}}>
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
																	value={this.props.pages.search.name}
																	onChange={(event) => this.props.pageViewChangeSearch('name', event.target.value)}
																	onKeyDown={this._onKeyDown.bind(this)}/>
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																SEO Title
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Name" className="form-control"
																	value={this.props.pages.search.seo_title}
																	onChange={(event) => this.props.pageViewChangeSearch('seo_title', event.target.value)}
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
																<button type="button" className="btn default" onClick={() => this.props.pageViewToggleSearch()}>
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
										<div className="search-page search-content-4">
											<div className="search-table table-responsive">
												{this._renderList()}
											</div>
										</div>
									</div>
									<div className="portlet-body">
										<div className="search-page">
											<Pagination totalPages={this.props.pages.pagination.totalPages}
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

const mapStateToProps = ({pages}) => {
	return {pages};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...PagesActions,
		...ThemeActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(pageView);