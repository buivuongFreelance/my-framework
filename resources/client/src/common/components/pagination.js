import React, {Component} from 'react';

import ScriptHOC from '../../common/hoc/Script';
import CSS from '../../common/config/css';
import JS from '../../common/config/js';
import {PAGE_LIMIT} from '../../common/config';

class Pagination extends Component{
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
		this.loaded = false;
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.totalPages !== this.props.totalPages){
			let pagination = $(this.refs.pagination);
			pagination.twbsPagination('destroy');
			this._loadPlugin(nextProps.totalPages);
		}
	}
	_init(){
		if(!this.loaded){
			this._loadPlugin(this.props.totalPages);
			this.loaded = true;
		}
	}
	_loadPlugin(totalPages){
		let _this = this;
		let pagination = $(this.refs.pagination);
		pagination.twbsPagination({
			totalPages: totalPages,
			visiblePages: PAGE_LIMIT,
			initiateStartPageClick: false,
			onPageClick: (event, page) => {
				_this.props.onChange(page);
			},
			activeClass: 'page-active',
			hideOnlyOnePage: true
		});
	}
	render(){
		return (
			<div className="search-pagination">
                <ul className="pagination" ref="pagination"/>
            </div>
		);
	};
};

export default ScriptHOC(
	{
		css: [CSS.pagination],
		js: [JS.pagination]
	}
)(Pagination);