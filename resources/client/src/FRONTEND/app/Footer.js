import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ThemeActions from '../../theme/actions';
import {routerActions} from 'react-router-redux';

class Footer extends Component {
  	render() {
	    return (
	    	<div>
				<div className="tp-footer">
					<div className="container">
						<div className="row ft-links">
							<div className="col-md-3 ft-link-block">
								<h3>Dịch vụ</h3>
								<ul>
						          <li><a href="#">Root Canal</a></li>
						          <li><a href="#">Implant Dentistry</a></li>
						          <li><a href="#">Conscious Sedction</a></li>
						          <li><a href="#">Restorations</a></li>
						          <li><a href="#">Gum Treatment</a></li>
						          <li><a href="#">Teeth Whitening</a></li>
						          <li><a href="#">Smile Design</a></li>
						          <li><a href="#">Snoring &amp; Sleep Apnea</a></li>
						        </ul>
							</div>
							<div className="col-md-offset-1 col-md-4 ft-link-block">
						        <h3>Bác sĩ</h3>
						        <ul>
						          <li><a href="#">Dr. Richard Seth</a></li>
						          <li><a href="#">Dr. Naina Shah</a></li>
						          <li><a href="#">Dr. John Deo</a></li>
						          <li><a href="#">Dr. Meera Joshi</a></li>
						          <li><a href="#">Dr. Thirtha Vyas</a></li>
						          <li><a href="#">Dr. Tanmay Rissol</a></li>
						          <li><a href="#">Dr. Martine Rao</a></li>
						          <li><a href="#">Dr. Ripple Dave</a></li>
						        </ul>
						    </div>
						    <div className="col-md-3 ft-link-block">
						        <h3>Liên kết</h3>
						        <ul>
									<li><a href="#">Giới thiệu</a></li>
									<li><a href="#">Tin tức về sức khỏe</a></li>
									<li><a href="#">Hỏi đáp</a></li>
									<li><a href="#">Sơ đồ website</a></li>
									<li><a href="#">Điều khoản và quy trình</a></li>
						        </ul>
						    </div>
						</div>
						<div className="row">
      						<div className="col-md-9 ft-contact">
        						<h3>Contact Us</h3>
        						<div className="row">
          							<div className="col-md-4 ft-address">
            							<div>
            								<i className="fa fa-map-marker"></i>28 Jackson BLVD STE 1020 Chicago, IL 60604-2340
            							</div>
          							</div>
          							<div className="col-md-4 ft-phone">
            							<div><i className="fa fa-phone"></i>1800-123-4567</div>
          							</div>
          							<div className="col-md-4 ft-mail">
            							<div><i className="fa fa-envelope"></i>info@denistry.com</div>
          							</div>
        						</div>
      						</div>
      						<div className="col-md-3 ft-btn">
        						<a href="#" className="btn tp-btn-default">Đặt lịch hẹn</a>
        					</div>
    					</div>
    					<div className="row tp-tiny-footer">
      						<div className="col-md-9">
        						<div className="">All rights reserved 2016 © PRIMACARE</div>
      						</div>
      						<div className="col-md-3 tp-social-icon">
						        <ul>
						          <li><a href="#"><i className="fa fa-facebook-square"></i></a></li>
						          <li><a href="#"><i className="fa fa-twitter-square"></i></a></li>
						          <li><a href="#"><i className="fa fa-google-plus-square"></i></a></li>
						          <li><a href="#"><i className="fa fa-youtube-square"></i></a></li>
						          <li><a href="#"><i className="fa fa-instagram"></i></a></li>
						        </ul>
      						</div>
    					</div>
					</div>
				</div>
			</div>
	    );
  	};
};

const mapStateToProps = ({userAuth}) => {
	return {userAuth};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		...ThemeActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);