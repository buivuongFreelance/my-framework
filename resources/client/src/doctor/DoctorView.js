import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';

import * as DoctorActions from './actions/view';
import * as ThemeActions from '../theme/actions';
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

import {DEFAULT_URL} from '../common/config';

class DoctorView extends Component{
	componentDidMount(){
		let _this = this;

		this.props.themeShowLoadingEl(this.refs.list);
		this.props.doctorViewLoadList()
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
											<a className="btn btn-default btn-sm"
												onClick={()=>this.props.push(Routes.backend.doctorNew)}>
												<i className="fa fa-plus"/> New Doctor
											</a>
										</div>
									</div>
									<div className="portlet-body">
										<div className="mt-element-card mt-card-round mt-element-overlay">
											<div className="row">
												{
													this.props.doctors.list.map(doctor => {
														return (
															<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={doctor.uid}>
																<div className="mt-card-item">
																	<div className="mt-card-avatar mt-overlay-1">
																		<img src={doctor.doctor.avatar ? DEFAULT_URL+'/images/'+doctor.doctor.avatar: DEFAULT_URL+'/images/no_avatar.png'}/>
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
												}
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