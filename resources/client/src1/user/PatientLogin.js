import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UserActions} from '../user';
import {ThemeActions} from '../theme';
import {GetFormValues} from '../common/helpers';

const reducerName = 'patientLoginForm';

class PatientLogin extends Component{
	_onValidation(field, value){
		let errors = [];
		switch(field){
			case 'email':
				if(is.empty(value))
					errors.push({error: 'Email Address Required', field});
				else if(!is.email(value))
					errors.push({error: 'Email Address Must Be Correct !!!!', field});
				break;
			case 'password':
				if(is.empty(value))
					errors.push({error: 'Password Required', field});
				else if(value.length < 6)
					errors.push({error: 'Password Must At Least 6 Characters', field});
				break;
		}
		return errors;
	}
	_onChangeField(field, event){
		const value = event.target.value;
		this.props.userPatientLoginChangeField(field, value);
		this._onValidationChange(field, value);
	}
	_onFocusField(){
		const {touched} = this.props[reducerName];
		if(!touched)
			this.props.userPatientLoginFocusField();
	}
	_onSubmit(event){
		event.preventDefault();
		if(!this.props[reducerName].submitting){
			this.props.userPatientLoginFocusField();
			this._onValidationChange('email', this.props[reducerName].email.value);
			this._onValidationChange('password', this.props[reducerName].password.value);
		}else{
			const values = GetFormValues(this.props[reducerName]);
			this.props.userPatientLoginSubmit(values);
		}
	}
	_onValidationChange(field, value){
		const errors = this._onValidation(field, value);
		this.props.userPatientLoginValidationField(field, errors, reducerName);
	}
	render(){
		const {touched, submitting, name, email, password, rePassword} = this.props[reducerName];
		return (
			<div className="tp-main-container">
				<div className="tp-contact">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h1>Patient Login</h1>
								<form className="form-horizontal" onSubmit={this._onSubmit.bind(this)}>
									<div className={(touched && email.error) ? 'form-group required has-error': 'form-group required'}>
										<label htmlFor="email" className="col-sm-2 control-label">Email</label>
										<div className="col-sm-10">
											<input type="email" className="form-control" placeholder="Your Email"
												id="email" name="email"
												onChange={this._onChangeField.bind(this, 'email')}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, 'email')}/>
											{touched && email.error && <small className="text-danger">{email.error}</small>}
										</div>
									</div>
									<div className={(touched && password.error) ? 'form-group required has-error': 'form-group required'}>
										<label htmlFor="password" className="col-sm-2 control-label">Password</label>
										<div className="col-sm-10">
											<input type="password" className="form-control" placeholder="Your Password"
												id="password" name="password"
												onChange={this._onChangeField.bind(this, 'password')}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, 'password')}/>
											{touched && password.error && <small className="text-danger">{password.error}</small>}
										</div>
									</div>
									<div className="form-group">
    									<div className="col-sm-offset-2 col-sm-10">
      										<button type="submit" className="btn btn-primary">Login Patient</button>
    									</div>
  									</div>
  									<div className="form-group">
    									<div className="col-sm-6">
      										<a onClick={this.props.themeClickClientRegistration}>Create New Member</a>
    									</div>
  									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
};

const mapStateToProps = ({patientLoginForm}) => {
	return {patientLoginForm};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...UserActions,
		...ThemeActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientLogin);