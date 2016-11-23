import React, {Component} from 'react';

class Header extends Component{
	render(){
		return (
			<header id="layout-header">
				<div className="main-holder">
					<div className="tp-top-bar">
						<div className="container">
							<div className="row">
								<div className="col-md-6 clinic-address">
	          						<div>
	          							<i className="fa fa-map-marker"></i> 28 Jackson, Near Street 1020 Chicago, IL 60604-2340
	          						</div>
	        					</div>
	        					<div className="col-md-6 tp-social">
						        	<ul>
						            	<li><a href="#"><i className="fa fa-facebook"></i></a></li>
						            	<li><a href="#"><i className="fa fa-twitter"></i></a></li>
						            	<li><a href="#"><i className="fa fa-google"></i></a></li>
						          	</ul>
						        </div>
							</div>
						</div>
					</div>
					<header className="tp-header">
						<div className="container">
							<div className="row">
								<div className="col-md-3 tp-logo">
									<a className="navbar-brand"><img src="http://jituchauhan.com/medical/dentist/green/html-regular/images/logo.png" className="img-responsive"/></a>
								</div>
								<div className="col-md-9 tp-top-link">
          							<p className="navbar-text navbar-right">
          								<a className="link">
          									<i className="fa fa-comments-o"></i> 24/7 Support
          								</a>
          								<a className="link">
          									<i className="fa fa-phone"></i> 1800-123-4567
          								</a>
          								<a className="navbar-link">
          									<i className="fa fa-envelope"></i> info@dentistry.com
          								</a>
          							</p>
        						</div>
							</div>
						</div>
					</header>
					<div className="tp-navigation" id="headersticky">
						<nav className="navbar navbar-default navbar-static-top marginBottom-0">
							<div className="container">
								<div className="navbar-header">
          							<button type="button" className="navbar-toggle" 
          								data-toggle="collapse" data-target="#navbar-collapse-1">
          								<span className="sr-only">Toggle navigation</span> 
          								<span className="icon-bar"></span> 
          								<span className="icon-bar"></span>
          								<span className="icon-bar"></span>
          							</button>
        						</div>
        						<div className="collapse navbar-collapse" id="navbar-collapse-1">
        							<ul className="nav navbar-nav">
        								<li><a href="{{ 'homepage'|page }}" title="Home">Home</a></li>
        								<li><a href="{{ 'about-us'|page }}" title="About Us">About Us</a></li>
            							<li><a href="{{ 'terms-conditions'|page }}" title="About Us">Terms Of Conditions</a></li>
							            <li><a href="{{ 'sitemap'|page }}" title="Sitemap">Sitemap</a></li>
							            <li><a href="{{ 'faq'|page }}" title="Faq">Faq</a></li>
							            <li><a href="{{ 'news'|page }}" title="News">News</a></li>
							            <li><a href="{{ 'doctors'|page }}" title="Doctors">Doctors</a></li>
							            <li><a href="{{ 'services'|page }}" title="Services">Services</a></li>
        							</ul>
        						</div>
							</div>
						</nav>
					</div>
				</div>
			</header>
		);
	};
};

export default Header;