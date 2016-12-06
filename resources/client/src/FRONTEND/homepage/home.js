import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Slideshow from '../../common/components/slideshow';

import * as ThemeActions from '../../theme/actions';
import * as SlideshowViewActions from '../../slideshow/actions/view';
import * as ServiceViewActions from '../../service/actions/view';
import * as DoctorViewActions from '../../doctor/actions/view';
import {routerActions} from 'react-router-redux';
import Routes from '../../common/config/routes';

import {DEFAULT_URL} from '../../common/config';

class Home extends Component{
	componentDidMount(){
		this._loadListSlideshow();
		this._loadListService();
		this._loadListDoctor();
	}
	_loadListSlideshow(){
		const pagination = this.props.slideshows.pagination;
		const search = this.props.slideshows.search;
		const sort = this.props.slideshows.sort;
		this.props.slideshowViewLoadList(pagination.offset, pagination.limit, search, sort);
	}
	_loadListService(){
		const pagination = this.props.services.pagination;
		const search = this.props.services.search;
		this.props.serviceViewLoadList(pagination.offset, 4, search);
	}
	_loadListDoctor(){
		const pagination = this.props.doctors.pagination;
		const search = this.props.doctors.search;
		this.props.doctorViewLoadList(pagination.offset, pagination.limit, search);
	}
	render(){
		return (
			<div>
				<div className="tp-slider">
					<Slideshow id="slider">
						{
							this.props.slideshows.list.map(slideshow => {
								return (
									<div className="item" key={slideshow.uid}>
										<div className="container">
											<div className="caption">
												<h1>{slideshow.name}</h1>
												<p>{slideshow.description}</p>
												<a className="btn tp-btn-second">Đặt lịch hẹn</a>
											</div>
										</div>
										<img src={DEFAULT_URL+'/storage/'+slideshow.avatar}/>
									</div>
								);
							})
						}
					</Slideshow>
				</div>
				<div className="tp-service">
					<div className="container-fluid">
						<div className="row">
							{
								this.props.services.list.map(service => {
									return (
										<div className="col-md-3 tp-light-box tp-service-blk" key={service.uid}>
											<div className="service-icon">
												<img src={DEFAULT_URL+'/storage/'+service.avatar} alt=""
													width="100%"/>
											</div>
											<h2>
												<a href="#">{service.name}</a>
											</h2>
											<p>{service.description}</p>
			        						<a href="#" className="link">Xem thêm</a>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>
				<div className="tp-section tp-block-center">
					<div className="container tp-about-section">
						<div className="row tp-feature-section">
							<div className="col-md-4 tp-feature-block">
								<i className="fa fa-support feature-icon"></i>
								<h2>Hỗ trợ 24/7</h2>
								<p>Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên.</p>
							</div>
							<div className="col-md-4 tp-feature-block">
								<i className="fa fa-medkit feature-icon"></i>
								<h2>Chăm sóc tận tình</h2>
								<p>Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên.</p>
							</div>
							<div className="col-md-4 tp-feature-block">
								<i className="fa fa-user-md feature-icon"></i>
								<h2>Đội ngũ chuyên nghiệp</h2>
								<p>Trái với quan điểm chung của số đông, Lorem Ipsum không phải chỉ là một đoạn văn bản ngẫu nhiên.</p>
							</div>
						</div>
					</div>
				</div>
				<div className="tp-section tp-doctor-section">
					<div className="container">
						<div className="row">
							<div className="col-md-12 tp-title-center">
								<h1>Đội ngũ bác sĩ chuyên nghiệp</h1>
								<p>Có rất nhiều biến thể của Lorem Ipsum mà bạn có thể tìm thấy, nhưng đa số được biến đổi.</p>
							</div>
						</div>
					</div>
					<div className="tp-doctors-list">
						<div className="container-fluid">
							<div className="row">
								{
									this.props.doctors.list.map(doctor => {
										return (
											<div className="col-md-3 no-padding tp-doctor-block" key={doctor.uid}>
												<div className="effect-pic">
													<a href="#">
														<img src={DEFAULT_URL+'/storage/'+doctor.doctor.avatar} alt="" className="img-responsive"/>
													</a>
												</div>
												<div className="tp-dc-info tp-dark-box">
			            							<h2><a href="#">{`${doctor.doctor.first_name} ${doctor.doctor.last_name}`}</a></h2>
			            							<span className="designation">{doctor.doctor.job_title}</span>
			            						</div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
};

const mapStateToProps = ({userAuth, slideshows, services, doctors}) => {
	return {userAuth, slideshows, services, doctors};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...SlideshowViewActions,
		...ServiceViewActions,
		...DoctorViewActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);