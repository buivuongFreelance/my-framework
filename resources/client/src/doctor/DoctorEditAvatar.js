import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageHead from '../app/PageHead';
import Breadcrumb from '../app/Breadcrumb';
import PageContent from '../app/PageContent';
import ImageUpload from '../common/components/imageUpload';

import * as ThemeActions from '../theme/actions';
import * as DoctorViewActions from './actions/view';
import * as Doctor
import {routerActions} from 'react-router-redux';
import Routes from '../common/config/routes';

class DoctorEdit extends Component{
	componentDidMount(){
		let _this = this;
		const query = this.props.location.query;

		this.props.themeShowLoadingEl(this.refs.detail);
		this.props.doctorViewDetail(query.uid)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.detail);
			_this.props.themeShowError(message);
		});
	}
	_uploadAvatar(event){
		event.preventDefault();
		console.log(this.refs.imageUpload);
		const image = this.refs.imageUpload.getImage();
		console.log(image);
	}
	render(){
		return (
			<div className="page-content-wrapper" ref="detail">
				<PageHead title={'Doctor '+this.props.doctor.first_name+' '+this.props.doctor.last_name}/>
				<PageContent>
					<Breadcrumb>
						<li>
							<a onClick={() => this.props.push(Routes.backend.doctorList)}>Doctor List</a>
							<i className="fa fa-circle"/>
						</li>
						<li>
							<span>{this.props.doctor.first_name+' '+this.props.doctor.last_name}</span>
						</li>
					</Breadcrumb>
					<div className="page-content-inner">
						<div className="row">
							<div className="col-md-12">
								
								<div className="tabbable-line boxless tabbable-reversed">
									<ul className="nav nav-tabs">
										<li ref="avatar" className="active">
											<a> Avatar</a>
										</li>
										<li ref="form">
											<a> Edit Information</a>
										</li>
										<li ref="uploads">
											<a> Other Images</a>
										</li>
									</ul>
									<div className="tab-content">
										<div className="tab-pane active">
											<div className="portlet box blue-hoki" ref="form">
												<div className="portlet-title">
													<div className="caption">
														Avatar
													</div>
												</div>
												<div className="portlet-body form">
													<form method="POST" noValidation className="form-horizontal" encType="multipart/form-data">
														<div className="form-body">
															
															<div className="row">
																<div className="col-md-12">
																	<label className="col-md-3 control-label">
																		Avatar
																	</label>
																	<div className="col-md-9">
																		<ImageUpload ref="imageUpload"/>
																	</div>
																</div>
															</div>

														</div>

														<div className="form-actions">
															<div className="row">
																<div className="col-md-6">
																	<div className="row">
																		<div className="col-md-offset-3 col-md-9">
																			<button type="submit" className="btn green" onClick={this._uploadAvatar.bind(this)}>
																				Upload
																			</button>
																			&nbsp;
																			<button type="button" className="btn default" onClick={() => this.props.push(Routes.backend.doctorList)}>
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
	}
};

const mapStateToProps = ({doctor}) => {
	return {doctor};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...DoctorViewActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorEdit);