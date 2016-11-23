import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
	componentDidMount(){
		
	}
  	render() {
	    return (
			<div>
				<Header/>
				<section id="layout-content">
					<div className="main-holder">
						{this.props.children}
					</div>
				</section>
        		<Footer/>
			</div>
	    );
  	};
};