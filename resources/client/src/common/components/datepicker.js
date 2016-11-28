import React, {Component} from 'react';

import ScriptHOC from '../../common/hoc/Script';
import CSS from '../../common/config/css';
import JS from '../../common/config/js';

class Datepicker extends Component{
	componentDidUpdate(){
		if(this.props.isLoadedCss && this.props.isLoadedJs){
			this._init();
		}
	}
	_init(){
		$(this.refs.root).datepicker({
			defaultViewDate: {year: 1990, month: 0, day: 1},
			format: 'dd/mm/yyyy',
		})
		.on('changeDate', function(event){
			console.log(event);
		})
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