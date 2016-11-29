import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as UserFormSignInActions from './actions/formSignIn';

class UserBackendSignIn extends Component{
	componentWillMount(){
		$('body').removeClass('page-container-bg-solid');
		$('body').addClass('login');
	}
	componentWillUnmount(){
		$('body').removeClass('login');
		$('body').addClass('page-container-bg-solid');
	}
	render(){
		console.log(this.props);

		return (
			<div>
				<div className="logo">
					<a>
						<img src=""/>
					</a>
				</div>
				<div className="content">
					<form className="login-form" method="post" noValidation>
						<h3 className="form-title form-green">Sign In</h3>
						<div className="alert alert-danger">
		                    <button className="close" data-close="alert"></button>
		                    <span> Enter any username and password. </span>
		                </div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Email</label>
							<input className="form-control form-control-solid placeholder-no-fix" type="text" autoComplete="off" placeholder="Email" name="email"
								onChange={e => this.props.userFormSignInChangeEmail(e.target.value)}/>
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Password</label>
							<input className="form-control form-control-solid placeholder-no-fix" type="password" autoComplete="off" placeholder="Password" name="password"/>
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
		...UserFormSignInActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBackendSignIn);