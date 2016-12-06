import React, {Component} from 'react';
import {CheckArray} from '../helpers/check';

function loopCallbackJs(i, files, self){
	if(i < files.length){
		$.getScript(files[i])
		.done((script, textStatus) => {
			loopCallbackJs(i+1, files, self);
		})
		.fail((jqxhr, settings, exception) => {
		})
	}else{
		self.setState({isLoadedJs: true});
	}
}

function loopCallbackCss(i, files, self){
	if(i < files.length){
		$.get(files[i])
		.success(()=>{
			loopCallbackCss(i+1, files, self);
			$('<link>', {rel: 'stylesheet', type: 'text/css', href: files[i]}).appendTo('head');
		})
		.error((jqxhr, textStatus)=>{

		})
	}else{
		self.setState({isLoadedCss: true});
	}
}

const ScriptParams = (...params) => {
	return ComposedComponent => {
		class Script extends Component{
			constructor(){
				super();
				this.state = {
					isLoadedCss: false,
					isLoadedJs: false
				}
			}
			componentDidMount(){
				const paramsCssJs = params[0];
				if(CheckArray(paramsCssJs.css))
					loopCallbackCss(0, paramsCssJs.css, this);
				if(CheckArray(paramsCssJs.js))
					loopCallbackJs(0, paramsCssJs.js, this);
			}
			render(){
				const newProps = {
					isLoadedCss: this.state.isLoadedCss,
					isLoadedJs: this.state.isLoadedJs
				}
				return <ComposedComponent {...this.props} {...newProps}/>
			}
		};

		return Script;
	};
};

export default ScriptParams;