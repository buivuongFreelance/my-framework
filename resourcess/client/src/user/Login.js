import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as ThemeActions} from '../theme';
import * as LoginFormActions from '../common/actions/FormActions';

const fields = ['email', 'password'];

class LoginComponent extends Component{
	componentDidMount(){
		this.props.showLoginBody();
	}
	componentWillUnmount(){
		this.props.hideLoginBody();
	}
	_onValidation(field, value){
		let error = '';
		switch(field){
			case 'email':
				if(is.empty(value))
					error = 'Email Required';
				else if(!is.email(value))
					error = 'Email Must Be Correct';
				break;
			case 'password':
				if(is.empty(value))
					error = 'Password Required';
				break;
		}
		return error;
	}
	_onChangeField(field, event){
		const value = event.target.value;
		const error = this._onValidation(field, value);
		this.props.onChangeField(field, value);
		this.props.onValidationField(field, error, fields, this.props.loginForm);
	}
	_onFocusField(){
		const {touched} = this.props.loginForm;
		if(!touched)
			this.props.onFocusField();
	}
	render(){
		const {touched, submitting, email, password} = this.props.loginForm;

		return (
			<div className="login_wrapper">
				<div className="animate form login_form">
					<section className="login_content">
						<form>
							<h1>Login Form</h1>
							<div className="form-group text-left">
								<input type="text" 
									className="form-control" 
									placeholder="Email"
									style={{marginBottom: 0}}
									onChange={this._onChangeField.bind(this, fields[0])}
									onFocus={this._onFocusField.bind(this)}/>
								{touched && !email.valid && <small className="form-text text-danger">{email.error}</small>}
							</div>
							<div className="form-group text-left" style={{marginTop: 20}}>
								<input type="password" 
									className="form-control"
									placeholder="Password"
									style={{marginBottom: 0}}
									onChange={this._onChangeField.bind(this, fields[1])}
									onFocus={this._onFocusField.bind(this)}/>
								{touched && !password.valid && <small className="form-text text-danger">{password.error}</small>}
							</div>
							<div>
								<a className="btn btn-default submit" disabled={!submitting}>Log In</a>
								<a className="reset_pass">Lost Your Password</a>
							</div>

							<div className="clearfix"/>

							<div className="separator">
								<p className="change_link">
									New to site?&nbsp;
									<a className="to_register">
										Create Account
									</a>
								</p>
								<div className="clearfix"/>
								<br/>
								<div>
									<h1><i className="fa fa-paw"/> Primacare</h1>
									<p>@2016 All Rights Reserved. Primacare is Admin Template. Privacy and Terms.</p>
								</div>
							</div>

						</form>
					</section>
				</div>
			</div>
		);
	};
};

const mapStateToProps = ({theme, loginForm}) => {
	return {theme, loginForm};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...ThemeActions,
		...LoginFormActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);