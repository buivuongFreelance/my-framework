import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as UserFormSignInActions from './actions/formSignIn';
import * as ThemeActions from '../theme/actions';

class UserBackendSignIn extends Component{
	componentWillMount(){
		$('body').removeClass('page-container-bg-solid');
		$('body').addClass('login');
	}
	componentWillUnmount(){
		$('body').removeClass('login');
		$('body').addClass('page-container-bg-solid');
	}
	_onSubmit(event){
		event.preventDefault();
		let _this = this;

		this.props.themeShowLoadingEl(this.refs.login);
		this.props.userBackendFormSignInSubmit(this.props.userFormSignIn.values)
		.then(data => {
			_this.props.themeHideLoadingEl(_this.refs.login);
			_this.props.themeShowSuccess('Sign In Successfully');
		})
		.catch(message => {
			_this.props.themeHideLoadingEl(_this.refs.login);
			_this.props.themeShowError(message);
		})
	}
	render(){
		return (
			<div>
				<div className="logo">
					<a>
						<img src=""/>
					</a>
				</div>
				<div className="content" ref="login">
					<form className="login-form" method="post" noValidation onSubmit={this._onSubmit.bind(this)}>
						<h3 className="form-title form-green">Sign In</h3>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Email</label>
							<input className="form-control form-control-solid placeholder-no-fix" type="text" autoComplete="off" placeholder="Email Address" name="email"
								onChange={e => this.props.userFormSignInChange('email', e.target.value)}/>
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Password</label>
							<input className="form-control form-control-solid placeholder-no-fix" type="password" autoComplete="off" placeholder="Password" name="password"
								onChange={e => this.props.userFormSignInChange('password', e.target.value)}/>
						</div>
						<div className="form-actions">
							<button type="submit" className="btn green uppercase">Login</button>
						</div>
					</form>
				</div>
			</div>
		);
	};
};

const mapStateToProps = ({userFormSignIn}) => {
	return {userFormSignIn};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...UserFormSignInActions,
		...ThemeActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBackendSignIn);