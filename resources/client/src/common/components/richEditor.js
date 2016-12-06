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
		let richEditor = $(this.refs.root);
		richEditor.summernote('destroy');
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.value !== this.props.value){
			let richEditor = $(this.refs.root);
			richEditor.summernote('code', nextProps.value);
		}
	}
	componentWillUnmount(){
		this.loaded = false;
	}
	_init(){
		let _this = this;
		let richEditor = $(this.refs.root);
		
		if(!this.loaded){
			richEditor.summernote({
				height: 300,
				callbacks: {
					onFocus: () => {
						_this.props.onFocus();
					},
					onChange: (contents, $editable) => {
						_this.props.onChange(contents);
					}
				}
			});
			this.loaded = true;
		}
	}
	render(){
		return (
			<div ref="root"/>
		);
	};
};

export default ScriptHOC(
	{
		css: [CSS.richEditor],
		js: [JS.richEditor]
	}
)(RichEditor);