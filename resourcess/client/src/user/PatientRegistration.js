import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PatientRegistrationFormActions from '../common/actions/FormActions';

const fields = ['name', 'email', 'password', 'rePassword'];

class PatientRegistration extends Component{
	_onValidation(field, value){
		let error = {message: '', field: field};
		switch(field){
			case 'name':
				if(is.empty(value))
					error.message = 'Name Required';
				else if(value.length < 4)
					error.message = 'Password Must At Least 4 Characters.';
				break;
			case 'email':
				if(is.empty(value))
					error.message = 'Email Address Required';
				else if(!is.email(value))
					error.message = 'Email Address Must Be Correct !!!!';
				break;
			case 'password':
				if(is.empty(value))
					error.message = 'Password Required';
				else if(value.length < 6)
					error.message = 'Password Must At Least 6 Characters.';
				else if(this.props.patientRegistrationForm.rePassword.value !== value){
					error.message = 'Must Be The Same With Re Typed Password';
				}else{
					error.message = '';
					error.field = 'rePassword';
				}
				break;
				
			case 'rePassword':
				if(is.empty(value))
					error.message = 'Re-Typed Password Required';
				else if(this.props.patientRegistrationForm.password.value !== value)
					error.message = 'Must Be The Same With Password';
				else{
					error.message = '';
					error.field = 'password';	
				}
				break;
		}
		return error;
	}
	_onChangeField(field, event){
		const value = event.target.value;
		const error = this._onValidation(field, value);
		this.props.onChangeField(field, value);
		this.props.onValidationField(field, error, fields, this.props.patientRegistrationForm);
	}
	_onFocusField(){
		const {touched} = this.props.patientRegistrationForm;
		if(!touched)
			this.props.onFocusField();
	}
	_onSubmit(event){
		event.preventDefault();
		console.log(this.props.patientRegistrationForm);
	}
	render(){
		const {touched, submitting, name, email, password, rePassword} = this.props.patientRegistrationForm;

		return (
			<div className="tp-main-container">
				<div className="tp-contact">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h1>Patient Registration</h1>
								<form className="form-horizontal" onSubmit={this._onSubmit.bind(this)}>
									<div className={(touched && name.error) ? 'form-group required has-error': 'form-group required'}>
										<label htmlFor="name" className="col-sm-2 control-label">Name</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" placeholder="Your Name"
												id="name" name="name"
												onChange={this._onChangeField.bind(this, fields[0])}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, fields[0])}/>
											{touched && name.error && <small className="text-danger">{name.error}</small>}
										</div>
									</div>
									<div className={(touched && email.error) ? 'form-group required has-error': 'form-group required'}>
										<label htmlFor="email" className="col-sm-2 control-label">Email</label>
										<div className="col-sm-10">
											<input type="email" className="form-control" placeholder="Your Email"
												id="email" name="email"
												onChange={this._onChangeField.bind(this, fields[1])}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, fields[1])}/>
											{touched && email.error && <small className="text-danger">{email.error}</small>}
										</div>
									</div>
									<div className={(touched && password.error) ? 'form-group required has-error': 'form-group required'}>
										<label htmlFor="password" className="col-sm-2 control-label">Password</label>
										<div className="col-sm-10">
											<input type="password" className="form-control" placeholder="Your Password"
												id="password" name="password"
												onChange={this._onChangeField.bind(this, fields[2])}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, fields[2])}/>
											{touched && password.error && <small className="text-danger">{password.error}</small>}
										</div>
									</div>
									<div className={(touched && rePassword.error) ? 'form-group required has-error': 'form-group required'}>
										<label htmlFor="rePassword" className="col-sm-2 control-label">Re Password</label>
										<div className="col-sm-10">
											<input type="password" className="form-control" placeholder="Re Typed Your Password"
												id="rePassword" name="rePassword"
												onChange={this._onChangeField.bind(this, fields[3])}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, fields[3])}/>
											{touched && rePassword.error && <small className="text-danger">{rePassword.error}</small>}
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="birthday" className="col-sm-2 control-label">Birthday</label>
										<div className="col-sm-10">
											<input type="date" className="form-control" placeholder="Your Birthday"
												id="birthday" name="birthday"
												onChange={this._onChangeField.bind(this, 'birthday')}/>
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="phone" className="col-sm-2 control-label">Phone</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" placeholder="Your Phone"
												id="phone" name="phone"
												onChange={this._onChangeField.bind(this, 'phone')}/>
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="address" className="col-sm-2 control-label">Address</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" placeholder="Your Address"
												id="address" name="address"
												onChange={this._onChangeField.bind(this, 'address')}/>
										</div>
									</div>
									<div className="form-group">
    									<div className="col-sm-offset-2 col-sm-10">
      										<button type="submit" className="btn btn-primary" disabled={!submitting}>Register Patient</button>
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

const mapStateToProps = ({patientRegistrationForm}) => {
	return {patientRegistrationForm};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...PatientRegistrationFormActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientRegistration);