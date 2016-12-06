import React, {Component} from 'react';
import moment from 'moment';

import ScriptHOC from '../../common/hoc/Script';
import CSS from '../../common/config/css';
import JS from '../../common/config/js';

import {DEFAULT_URL} from '../../common/config';

class MultipleImageUpload extends Component{
	constructor(){
		super();
		this.files = [];
		this.loaded = false;
		this.state = {
			imagesPreview: []
		};
	}
	componentDidUpdate(){
		if(this.props.isLoadedCss && this.props.isLoadedJs){
			this._init();
		}
	}
	componentWillUnmount(){
		this.files = [];
		this.loaded = false;
		this.state = {
			imagesPreview: []
		};
	}
	componentWillReceiveProps(nextProps){
		const images = nextProps.images;
		if(images.length > 0){
			if(this.state.imagesPreview.length === 0){
				this.files = images;
				let imagesPreview = [];
				images.map(image => {
					imagesPreview.push({image: `${DEFAULT_URL}/storage/${image.image}`, status: 'server', id: image.uid});
				});
				this.setState({
					imagesPreview: imagesPreview
				});
			}
		}
	}
	getImage(){
		return this.file;
	}
	_init(){
		let _this = this;
		if(!this.loaded){
			let control = $(this.refs.file);
			$(this.refs.file).on('change', () => {
				const files = _this.refs.file.files;
				let imagesPreview = this.state.imagesPreview;
				if(files){
					for(let i = 0; i < files.length; i++){
						let file = files[i];
						let isValid = true;
						for(let j = 0; j < _this.files.length; j++){
							let f = _this.files[j];
							if(f.lastModified === file.lastModified){
								isValid = false;
								break;
							}
						}
						if(isValid){
							_this.files.push(file);
							let reader = new FileReader();
							reader.onload = event => {
								imagesPreview.push({image: event.target.result, status: 'serverless', id: file.lastModified});
								_this.setState({imagesPreview: imagesPreview});
							};
							reader.readAsDataURL(file);
						}
					}
					_this.props.onChange(_this.files);
					control.val('');
				}
			});
			this.loaded = true;
		}
	}
	_onRemoveImage(image, key){
		if(image.status === 'serverless'){
			let imagesPreview = this.state.imagesPreview;
			imagesPreview.splice(key, 1);
			this.files.splice(key, 1);
			this.props.onChange(this.files);
			this.setState({imagesPreview: imagesPreview});
		}else{
			this.props.onRemove(image);
		}
	}
	_renderImagesPreview(){
		if(this.state.imagesPreview.length === 0)
			return (
				<div className="col-md-12">
					<p>There is no images here</p>
				</div>
			)
		else{
			return this.state.imagesPreview.map((image, key) => {
				return (
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4" key={image.id} id={image.id}>
						<div className="mt-card-item">
							<div className="mt-card-avatar">
								<img src={image.image} style={{width: '100%'}}/>
							</div>
							<div className="mt-card-content">
								<button type="button" className={image.status === 'serverless' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-default'} onClick={this._onRemoveImage.bind(this, image, key)}>
									{image.status === 'serverless' ? 'Remove': 'Remove Server'}
								</button>
							</div>
						</div>
					</div>
				)
			})
		}
	}
	render(){
		return (
			<div>
				<div className="fileinput fileinput-new" data-provides="fileinput">
					<span className="btn green btn-file">
						<span className="fileinput-new">Select Images</span>
						<span className="fileinput-exists">Add Images</span>
						<input type="file" name="..." multiple ref="file" accept="image/*"/>
					</span>
				</div>
				<div className="mt-element-card">
					<div className="row">
						{this._renderImagesPreview()}
					</div>
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
)(MultipleImageUpload);