import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import Pagination from '../common/components/pagination';
import ConfirmModal from '../common/components/confirm';

import * as ServiceActions from './actions/view';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';
import {GetOffsetPage} from '../common/helpers';

class ServiceView extends Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		}
	}
	componentDidMount(){
		this._loadListService();
	}
	componentWillUnmount(){
		this.props.serviceViewClear();
	}
	_loadListService(){
		let _this = this;
		const pagination = this.props.services.pagination;
		const search = this.props.services.search;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.serviceViewLoadList(pagination.offset, pagination.limit, search)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this.props.themeShowError(message);
		});
	}
	_onGoToDetail(service){
		this.props.push({
			pathname: Routes.backend.serviceEditAvatar,
			query: {uid: service.uid}
		});
	}
	_onChangePage(page){
		const offset = GetOffsetPage(page);
		this.props.serviceViewChangePage(page, offset);
		this._loadListService();
	}
	_onKeyDown(event){
		if(event.key === 'Enter'){
			this._loadListService();
		}
	}
	_renderList(){
		if(this.props.services.list.length === 0){
			return (
				<div className="col-md-12">
					There is no service here.
				</div>
			);
		}else{
			return (
				this.props.services.list.map(service => {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={service.uid}>
							<div className="mt-card-item">
								<div className="mt-card-avatar mt-overlay-1">
									<img src={service.avatar ? DEFAULT_URL+'/storage/'+service.avatar: DEFAULT_URL+'/images/no_avatar.png'}/>
								</div>
								<div className="mt-card-content">
									<h3 className="mt-card-name">{`${service.name}`}</h3>
									<p className="mt-card-desc font-grey-mint">{service.description}</p>
								</div>
								<div className="mt-card-content">
									<button className="btn btn-sm btn-primary"
										onClick={this._onGoToDetail.bind(this, service)}>Edit</button>
									&nbsp;
									<button className="btn btn-sm btn-default" onClick={this._onRemove.bind(this, service)}>Remove</button>
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
		this.props.serviceViewResetSearch();
		setTimeout(()=>{
			this._loadListService();
		}, 0)
	}
	_onRemove(page){
		this.props.serviceViewSelected(page);
		this.setState({confirm: true});
	}
	_onAcceptRemove(){
		let _this = this;
		const uid = this.props.services.selected.uid;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.serviceViewRemove(uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this._loadListService();
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
				<ConfirmModal message="Do you really want to remove this service?"
					modal={this.state.confirm}
					onAccept={this._onAcceptRemove.bind(this)}
					onRequestClose={()=>this.setState({confirm: false})}/>
				<PageHead title={'Service List'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<span>Service List</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet light portlet-fit" ref="list">
									<div className="portlet-title">
										<div className="caption">
											Service List
										</div>
										<div className="actions">
											<a className="btn btn-default btn-sm" onClick={() => this.props.serviceViewToggleSearch()}>
												<i className="fa fa-search"/> Search
											</a>
											&nbsp;
											<a className="btn btn-default btn-sm"
												onClick={() => this.props.push(Routes.backend.serviceNew)}>
												<i className="fa fa-plus"/> New Service
											</a>
										</div>
									</div>
									<div className="portlet-title" style={{display: this.props.services.displaySearch ? 'block': 'none'}}>
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
																	value={this.props.services.search.name}
																	onChange={(event) => this.props.serviceViewChangeSearch('name', event.target.value)}
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
																<button type="button" className="btn default" onClick={() => this.props.serviceViewToggleSearch()}>
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
											<Pagination totalPages={this.props.services.pagination.totalPages}
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

const mapStateToProps = ({services}) => {
	return {services};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ServiceActions,
		...ThemeActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceView);