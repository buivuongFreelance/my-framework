import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import Pagination from '../common/components/pagination';
import ConfirmModal from '../common/components/confirm';

import * as SlideshowsActions from '../slideshow/actions/view';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';
import {GetOffsetPage, DisplayDateTime} from '../common/helpers';

class slideshowView extends Component{
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
		this.props.slideshowViewClear();
	}
	_loadList(){
		let _this = this;
		const pagination = this.props.slideshows.pagination;
		const search = this.props.slideshows.search;
		const sort = this.props.slideshows.sort;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.slideshowViewLoadList(pagination.offset, pagination.limit, search, sort)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this.props.themeShowError(message);
		});
	}
	_onGoToDetail(slideshow){
		this.props.push({
			pathname: Routes.backend.slideshowEdit,
			query: {uid: slideshow.uid}
		});
	}
	_onChangePage(slideshow){
		const offset = GetOffsetPage(slideshow);
		this.props.slideshowViewChangePage(slideshow, offset);
		this._loadList();
	}
	_onKeyDown(event){
		if(event.key === 'Enter'){
			this._loadList();
		}
	}
	_onSort(field){
		let _this = this;
		const currentField = this.props.slideshows.sort.field;
		let value = this.props.slideshows.sort.value;
		if(currentField === field)
			value = this.props.slideshows.sort.value === 'desc'?'asc':'desc';
		this.props.slideshowViewSort(field, value);
		setTimeout(()=>{
			_this._loadList();
		}, 0)
	}
	_renderList(){
		if(this.props.slideshows.list.length === 0)
			return (
				<p>
					There is no slideshow here.
				</p>
			);
		else{
			return (
				<table className="table table-bordered table-striped table-condensed">
					<thead className="bg-blue">
						<tr>
							<th><a>Avatar</a></th>
							<th><a>Name</a></th>
							<th><a>Description</a></th>
							<th><a>Actions</a></th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.slideshows.list.map(slideshow => {
								return (
									<tr key={slideshow.uid}>
										<td className="table-title">
											<img src={slideshow.avatar ? DEFAULT_URL+'/storage/'+slideshow.avatar: DEFAULT_URL+'/images/no_avatar.png'} accept="image/*"
												width="200"/>
										</td>
										<td className="table-title">{slideshow.name}</td>
										<td className="table-title">{slideshow.description}</td>
										<td className="table-title">
											<a onClick={this._onGoToDetail.bind(this, slideshow)}><i className="fa fa-pencil"/></a>
											&nbsp;
											<a onClick={this._onRemoveSlideshow.bind(this, slideshow)}><i className="fa fa-trash"/></a>
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
		this.props.slideshowViewResetSearch();
		setTimeout(()=>{
			this._loadList();
		}, 0)
	}
	_onRemoveSlideshow(slideshow){
		this.props.slideshowViewSelected(slideshow);
		this.setState({confirm: true});
	}
	_onAcceptRemoveSlideshow(){
		let _this = this;
		const uid = this.props.slideshows.selected.uid;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.slideshowViewRemove(uid)
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
			<div className="slideshow-content-wrapper">
				<ConfirmModal message="Do you really want to remove this slideshow?"
					modal={this.state.confirm}
					onAccept={this._onAcceptRemoveSlideshow.bind(this)}
					onRequestClose={()=>this.setState({confirm: false})}/>
				<PageHead title={'Slideshow List'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<span>Slideshow List</span>
						</li>
					</Breadcrumb>
					<div className="slideshow-content-inner">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet light portlet-fit" ref="list">
									<div className="portlet-title">
										<div className="caption">
											Slideshow List
										</div>
										<div className="actions">
											<a className="btn btn-default btn-sm" onClick={() => this.props.slideshowViewToggleSearch()}>
												<i className="fa fa-search"/> Search
											</a>
											&nbsp;
											<a className="btn btn-default btn-sm"
												onClick={() => this.props.push(Routes.backend.slideshowNew)}>
												<i className="fa fa-plus"/> New Slideshow
											</a>
										</div>
									</div>
									<div className="portlet-title" style={{display: this.props.slideshows.displaySearch ? 'block': 'none'}}>
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
																	value={this.props.slideshows.search.name}
																	onChange={(event) => this.props.slideshowViewChangeSearch('name', event.target.value)}
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
																<button type="button" className="btn default" onClick={() => this.props.slideshowViewToggleSearch()}>
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
										<div className="search-slideshow search-content-4">
											<div className="search-table table-responsive">
												{this._renderList()}
											</div>
										</div>
									</div>
									<div className="portlet-body">
										<div className="search-slideshow">
											<Pagination totalSlideshows={this.props.slideshows.pagination.totalSlideshows}
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

const mapStateToProps = ({slideshows}) => {
	return {slideshows};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...SlideshowsActions,
		...ThemeActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(slideshowView);