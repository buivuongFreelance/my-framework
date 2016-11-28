import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
	componentDidMount(){
		$('body').addClass('page-container-bg-solid');
	}
	componentWillUnmount(){
		$('body').removeClass('page-container-bg-solid');	
	}
  	render() {
	    return (
			<div>
				<Header/>
				<div>
					{this.props.children}
				</div>
        		<Footer/>
			</div>
	    );
  	};
};