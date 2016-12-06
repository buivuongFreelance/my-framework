import React, {Component} from 'react';
import moment from 'moment';

import ScriptHOC from '../../common/hoc/Script';
import CSS from '../../common/config/css';
import JS from '../../common/config/js';

class RichEditor extends Component{
	constructor(){
		super();
		this.loaded = false;
	}
	componentDidUpdate(){
		if(this.props.isLoadedCss && this.props.isLoadedJs){
			this._init();
		}
	}
	componentWillUnmount(){
		//let richEditor = $(this.refs.root);
		//richEditor.summernote('destroy');
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.children.length !== this.props.children.length){
			let _this = this;
			let $root = $(this.refs.root);

			$root.data('owlCarousel').destroy();
			setTimeout(() => {
				_this._loadPlugin($root);
			}, 0);
		}
	}
	componentWillUnmount(){
		this.loaded = false;
	}
	_init(){
		let _this = this;
		let $root = $(this.refs.root);
		
		if(!this.loaded){
			this._loadPlugin($root);
			this.loaded = true;
		}
	}
	_loadPlugin($root){
		$root.owlCarousel({
			navigation: true,
		    slideSpeed: 300,
		    paginationSpeed: 300,
		    singleItem:true,
		    autoHeight: true,
		    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		    autoPlay: 4000,
		    transitionStyle: "fade"
		});
	}
	render(){
		return (
			<div className="owl-carousel owl-theme" ref="root" id={this.props.id}>
				{
					this.props.children
				}
			</div>
		);
	};
};

export default ScriptHOC(
	{
		css: [CSS.carousel, CSS.carouselTheme, CSS.carouselTransition],
		js: [JS.carousel]
	}
)(RichEditor);