import React, {Component} from 'react';
import moment from 'moment';

import ScriptHOC from '../../common/hoc/Script';
import CSS from '../../common/config/css';
import JS from '../../common/config/js';
import {DisplayDate} from '../../common/helpers';

class Datepicker extends Component{
	constructor(){
		super();
		this.loaded = false;
		this.loadedDefault = false;
	}
	componentDidUpdate(){
		if(this.props.isLoadedCss && this.props.isLoadedJs){
			this._init();
		}
	}
	componentWillUnmount(){
		this.loaded = false;
		this.loadedDefault = false;
	}
	_init(){
		let _this = this;
		let datepicker = $(this.refs.root);

		const options={defaultViewDate: {year: 1990, month: 0, day: 1}, format: 'dd/mm/yyyy', autoclose: true};

		if(!this.loadedDefault){
			const defaultDate = DisplayDate(this.props.value);
			if(defaultDate){
				datepicker.datepicker('update', defaultDate);
				this.loadedDefault = true;
			}
		}
		if(!this.loaded){
			datepicker.datepicker(options)
			.on('changeDate', function(event){
				const value = moment(event.date).format('YYYY-MM-DD');
				_this.props.onChange(value);
			})
			this.loaded = true;
		}
	}
	render(){
		return (
			<input type="text" className="form-control" ref="root"/>
		);
	};
};

export default ScriptHOC(
	{
		css: [CSS.datepicker],
		js: [JS.datepicker]
	}
)(Datepicker);