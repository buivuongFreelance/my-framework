import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import Pagination from '../common/components/pagination';

import * as DoctorActions from './actions/view';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';
import {GetOffsetPage} from '../common/helpers';

class DoctorView extends Component{
	componentDidMount(){
		this._loadListDoctor();
	}
	componentWillUnmount(){
		this.props.doctorViewClear();
	}
	_loadListDoctor(){
		let _this = this;
		const pagination = this.props.doctors.pagination;
		const search = this.props.doctors.search;
		this.props.themeShowLoadingEl(this.refs.list);
		this.props.doctorViewLoadList(pagination.offset, pagination.limit, search)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.list);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.list);
			_this.props.themeShowError(message);
		});
	}
	_onGoToDetail(doctor){
		this.props.push({
			pathname: Routes.backend.doctorEditAvatar,
			query: {uid: doctor.uid}
		});
	}
	_onChangePage(page){
		const offset = GetOffsetPage(page);
		this.props.doctorViewChangePage(page, offset);
		this._loadListDoctor();
	}
	_onKeyDown(event){
		if(event.key === 'Enter'){
			this._loadListDoctor();
		}
	}
	_renderList(){
		if(this.props.doctors.list.length === 0)
			return (
				<div className="col-md-12">
					There is no doctor here.
				</div>
			);
		else{
			return (
				this.props.doctors.list.map(doctor => {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={doctor.uid}>
							<div className="mt-card-item">
								<div className="mt-card-avatar mt-overlay-1">
									<img src={doctor.doctor.avatar ? DEFAULT_URL+'/storage/'+doctor.doctor.avatar: DEFAULT_URL+'/images/no_avatar.png'}/>
								</div>
								<div className="mt-card-content">
									<h3 className="mt-card-name">{`${doctor.doctor.first_name} ${doctor.doctor.last_name}`}</h3>
									<p className="mt-card-desc font-grey-mint">{doctor.email}</p>
								</div>
								<div className="mt-card-content">
									<button className="btn btn-sm btn-primary">View</button>
									&nbsp;
									<button className="btn btn-sm btn-default"
										onClick={this._onGoToDetail.bind(this, doctor)}>Edit</button>
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
		this.props.doctorViewResetSearch();
		setTimeout(()=>{
			this._loadListDoctor();
		}, 0)
	}
	render(){
		return(
			<div className="page-content-wrapper">
				<PageHead title={'Doctor List'}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<span>Doctor List</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								<div className="portlet light portlet-fit" ref="list">
									<div className="portlet-title">
										<div className="caption">
											Doctor List
										</div>
										<div className="actions">
											<a className="btn btn-default btn-sm" onClick={() => this.props.doctorViewToggleSearch()}>
												<i className="fa fa-search"/> Search
											</a>
											&nbsp;
											<a className="btn btn-default btn-sm"
												onClick={() => this.props.push(Routes.backend.doctorNew)}>
												<i className="fa fa-plus"/> New Doctor
											</a>
										</div>
									</div>
									<div className="portlet-title" style={{display: this.props.doctors.displaySearch ? 'block': 'none'}}>
										<div className="form-horizontal">
											<div className="form-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																First Name
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="First Name" className="form-control"
																	value={this.props.doctors.search.first_name}
																	onChange={(event) => this.props.doctorViewChangeSearch('first_name', event.target.value)}
																	onKeyDown={this._onKeyDown.bind(this)}/>
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																Last Name
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Last Name" className="form-control"
																	value={this.props.doctors.search.last_name}
																	onChange={(event) => this.props.doctorViewChangeSearch('last_name', event.target.value)}
																	onKeyDown={this._onKeyDown.bind(this)}/>
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="col-md-3 control-label">
																Email
															</label>
															<div className="col-md-9">
																<input type="text" placeholder="Email" className="form-control"
																	value={this.props.doctors.search.email}
																	onChange={(event) => this.props.doctorViewChangeSearch('email', event.target.value)}
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
																<button type="button" className="btn default" onClick={() => this.props.doctorViewToggleSearch()}>
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
											<Pagination totalPages={this.props.doctors.pagination.totalPages}
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

const mapStateToProps = ({doctors}) => {
	return {doctors};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...DoctorActions,
		...ThemeActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorView);