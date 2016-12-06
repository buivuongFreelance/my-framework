import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import Pagination from '../common/components/pagination';
import ConfirmModal from '../common/components/confirm';

import * as CatFaqsActions from '../catFaq/actions/view';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';
import {GetOffsetPage, DisplayDateTime} from '../common/helpers';

class catFaqView extends Component{
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
		this.props.catFaqViewClear();
	}
	_loadList(){
		let _this = this;
		const pagination = this.props.catFaqs.pagination;
		const search = this.props.catFaqs.search;
		const sort = this.props.catFaqs.sort;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.catFaqViewLoadList(pagination.offset, pagination.limit, search, sort)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this.props.themeShowError(message);
		});
	}
	_onGoToDetail(catFaq){
		this.props.push({
			pathname: Routes.backend.catFaqEdit,
			query: {uid: catFaq.uid}
		});
	}
	_onChangePage(catFaq){
		const offset = GetOffsetPage(catFaq);
		this.props.catFaqViewChangePage(catFaq, offset);
		this._loadList();
	}
	_onKeyDown(event){
		if(event.key === 'Enter'){
			this._loadList();
		}
	}
	_onSort(field){
		let _this = this;
		const currentField = this.props.catFaqs.sort.field;
		let value = this.props.catFaqs.sort.value;
		if(currentField === field)
			value = this.props.catFaqs.sort.value === 'desc'?'asc':'desc';
		this.props.catFaqViewSort(field, value);
		setTimeout(()=>{
			_this._loadList();
		}, 0)
	}
	_renderList(){
		if(this.props.catFaqs.list.length === 0)
			return (
				<p>
					There is no catFaq here.
				</p>
			);
		else{
			return (
				<table className="table table-bordered table-striped table-condensed">
					<thead className="bg-blue">
						<tr>
							<th><a>Name</a></th>
							<th><a>Description</a></th>
							<th><a>Actions</a></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.catFaqs.list.map(catFaq => {
								return (
									<tr key={catFaq.uid}>
										<td className="table-title">{catFaq.name}</td>
										<td className="table-title">{catFaq.description}</td>
										<td className="table-title">
											<a onClick={this._onGoToDetail.bind(this, catFaq)}><i className="fa fa-pencil"/></a>
											&nbsp;
											<a onClick={this._onRemoveCatFaq.bind(this, catFaq)}><i className="fa fa-trash"/></a>
										</td>
										<td className="table-title">
											<button className="btn btn-primary btn-sm">View FAQs</button>
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
		this.props.catFaqViewResetSearch();
		setTimeout(()=>{
			this._loadList();
		}, 0)
	}
	_onRemoveCatFaq(catFaq){
		this.props.catFaqViewSelected(catFaq);
		this.setState({confirm: true});
	}
	_onAcceptRemoveCatFaq(){
		let _this = this;
		const uid = this.props.catFaqs.selected.uid;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.catFaqViewRemove(uid)
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
			<div className="catFaq-content-wrapper">
				<ConfirmModal message="Do you really want to remove this catFaq?"
					modal={this.state.confirm}
					onAccept={this._onAcceptRemoveCatFaq.bind(this)}
					onRequestClose={()=>this.setState({confirm: false})}/>
				<PageHead title={'CatFaq List'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<span>CatFaq List</span>
						</li>
					</Breadcrumb>
					<div className="catFaq-content-inner">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet light portlet-fit" ref="list">
									<div className="portlet-title">
										<div className="caption">
											CatFaq List
										</div>
										<div className="actions">
											<a className="btn btn-default btn-sm" onClick={() => this.props.catFaqViewToggleSearch()}>
												<i className="fa fa-search"/> Search
											</a>
											&nbsp;
											<a className="btn btn-default btn-sm"
												onClick={() => this.props.push(Routes.backend.catFaqNew)}>
												<i className="fa fa-plus"/> New CatFaq
											</a>
										</div>
									</div>
									<div className="portlet-title" style={{display: this.props.catFaqs.displaySearch ? 'block': 'none'}}>
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
																	value={this.props.catFaqs.search.name}
																	onChange={(event) => this.props.catFaqViewChangeSearch('name', event.target.value)}
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
																<button type="button" className="btn default" onClick={() => this.props.catFaqViewToggleSearch()}>
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
										<div className="search-catFaq search-content-4">
											<div className="search-table table-responsive">
												{this._renderList()}
											</div>
										</div>
									</div>
									<div className="portlet-body">
										<div className="search-catFaq">
											<Pagination totalCatFaqs={this.props.catFaqs.pagination.totalCatFaqs}
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

const mapStateToProps = ({catFaqs}) => {
	return {catFaqs};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...CatFaqsActions,
		...ThemeActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(catFaqView);