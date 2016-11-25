import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UserActions} from '../user';
import {GetFormValues} from '../common/helpers';

const reducerName = 'patientRegistrationForm';

class PatientRegistration extends Component{
	componentDidMount(){
		let _this = this;
		$('#birthday').datepicker({
			format: 'mm/dd/yyyy',
			startView: 2
		})
		.on('changeDate', function(event){
			const date = moment(event.date).format('YYYY-MM-DD');
			_this.props.userPatientRegistrationChangeField('birthday', date);
		});
	}
	_onValidation(field, value){
		let errors = [];
		switch(field){
			case 'name':
				if(is.empty(value))
					errors.push({error: 'Required', field});
				else if(value.length < 4)
					errors.push({error: 'Must Be Larger Than 4 Characters', field});
				break;
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
				else if(this.props[reducerName].rePassword.value !== value){
					errors.push({error: '', field});
					errors.push({error: 'Must Be The Same With Password', field: 'rePassword'});
				}else{
					errors.push({error: '', field});
					errors.push({error: '', field: 'rePassword'});
				}
				break;
			case 'rePassword':
				if(is.empty(value))
					errors.push({error: 'Password Re-Typed Required', field});
				else if(this.props[reducerName].password.value !== value){
					errors.push({error: 'Must Be The Same With Password', field});
				}
				break;
		}
		return errors;
	}
	_onChangeField(field, event){
		const value = event.target.value;
		this.props.userPatientRegistrationChangeField(field, value);
		this._onValidationChange(field, value);
	}
	_onFocusField(){
		const {touched} = this.props[reducerName];
		if(!touched)
			this.props.userPatientRegistrationFocusField();
	}
	_onSubmit(event){
		event.preventDefault();
		if(!this.props[reducerName].submitting){
			this.props.userPatientRegistrationFocusField();
			this._onValidationChange('name', this.props[reducerName].name.value);
			this._onValidationChange('email', this.props[reducerName].email.value);
			this._onValidationChange('password', this.props[reducerName].password.value);
		}else{
			const values = GetFormValues(this.props[reducerName]);
			this.props.userPatientRegistrationSubmit(values);
		}
	}
	_onValidationChange(field, value){
		const errors = this._onValidation(field, value);
		this.props.userPatientRegistrationValidationField(field, errors, reducerName);
	}
	render(){
		const {touched, submitting, name, email, password, rePassword} = this.props[reducerName];

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
												onChange={this._onChangeField.bind(this, 'name')}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, 'name')}/>
											{touched && name.error && <small className="text-danger">{name.error}</small>}
										</div>
									</div>
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
									<div className={(touched && rePassword.error) ? 'form-group required has-error': 'form-group required'}>
										<label htmlFor="rePassword" className="col-sm-2 control-label">Re Password</label>
										<div className="col-sm-10">
											<input type="password" className="form-control" placeholder="Re Typed Your Password"
												id="rePassword" name="rePassword"
												onChange={this._onChangeField.bind(this, 'rePassword')}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, 'rePassword')}/>
											{touched && rePassword.error && <small className="text-danger">{rePassword.error}</small>}
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="birthday" className="col-sm-2 control-label">Birthday</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" placeholder="Your Birthday"
												id="birthday" name="birthday"/>
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
      										<button type="submit" className="btn btn-primary">Register Patient</button>
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
		...UserActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientRegistration);