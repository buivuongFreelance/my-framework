import React, {Component} from 'react';
import moment from 'moment';

import ScriptHOC from '../../common/hoc/Script';
import CSS from '../../common/config/css';
import JS from '../../common/config/js';

import {DEFAULT_URL} from '../../common/config';

class ImageUpload extends Component{
	constructor(){
		super();
		this.loaded = false;
		this.file = undefined;
		this.imagePreview = '';
	}
	componentDidUpdate(){
		if(this.props.isLoadedCss && this.props.isLoadedJs){
			this._init();
		}
	}
	componentWillUnmount(){
		this.file = undefined;
		this.loaded = false;
	}
	getImage(){
		return this.file;
	}
	_init(){
		let _this = this;
		if(!this.loaded){
			let control = $(this.refs.file);
			$(this.refs.file).on('change', () => {
				_this.file = _this.refs.file.files[0];
				_this.props.onChange(_this.file);
			});
			this.loaded = true;
		}
	}
	render(){
		return (
			<div className="fileinput fileinput-new" data-provides="fileinput">
				<div className="fileinput-new thumbnail" style={{width: '200px', height: '150px'}}>
					<img src={this.props.imagePreview ? DEFAULT_URL+'/storage/'+this.props.imagePreview: DEFAULT_URL+'/images/no_avatar.png'} accept="image/*"/>
				</div>
				<div className="fileinput-preview fileinput-exists thumbnail" style={{width: '200px', height: '150px'}}/>
				<div>
					<span className="btn red btn-outline btn-file">
						<span className="fileinput-new">Select Image</span>
						<span className="fileinput-exists">Change</span>
						<input type="file" name="..." ref="file" accept="image/*"/>
					</span>
					&nbsp;
					<a href="javascript:;" className="btn red fileinput-exists" data-dismiss="fileinput">Remove</a>
				</div>
			</div>
		);
	};
};

export default ScriptHOC(
	{
		css: [CSS.fileUpload],
		js: [JS.fileUpload]
	}
)(ImageUpload);