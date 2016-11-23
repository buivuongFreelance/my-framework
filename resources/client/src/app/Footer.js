import React, {Component} from 'react';

class Footer extends Component{
	render(){
		return (
			<footer id="layout-footer">
				<div className="tp-cta">
					<div className="container">
						<div className="row">
							<div className="col-md-2 cta-icon"> <img src="http://jituchauhan.com/medical/dentist/green/html-regular/images/teeth.svg" alt=""/></div>
							<div className="col-md-7 cta-content">
        						<h2>We are dedicated to giving each of our patients 
          						the healthy smile they deserve!</h2>
      						</div>
      						<div className="col-md-3 cta-btn"><a className="btn tp-btn-default"> get emergancy</a></div>
						</div>
					</div>
				</div>
				<div className="tp-footer">
					<div className="container">
						<div className="row ft-links">
							<div className="col-md-3 ft-link-block">
								<h3>Our Services</h3>
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
							<div className="col-md-3 ft-link-block">
								<h3>Our Doctors</h3>
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
        						<h3>About Clinic</h3>
        						<ul>
          							<li><a href="#">Our Clinic</a></li>
          							<li><a href="#">Photo Gallery</a></li>
          							<li><a href="#">Career</a></li>
          							<li><a href="#">Testimonials</a></li>
        						</ul>
      						</div>
      						<div className="col-md-3 ft-link-block">
        						<h3>Business Hours</h3>
        						<ul>
          							<li>Monday : 8:30 - 9:00</li>
          							<li>Tuesday : 8:00 - 9:00</li>
          							<li>Wednesday : 8:00 - 9:00</li>
          							<li>Thursday : 8:30 - 9:00</li>
          							<li>Friday : 10:00 - 4:00</li>
          							<li>Saturday : Closed</li>
          							<li>Sunday : Closed</li>
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
        						<a className="btn tp-btn-default">get  Emergency</a>
    						</div>
						</div>
						<div className="row tp-tiny-footer">
							<div className="col-md-9">
        						<div className="">All rights reserved 2015 © Primacare</div>
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
        	</footer>
		);
	};
};

export default Footer;