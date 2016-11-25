import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UserActions} from '../user';
import {DisplayDate} from '../common/helpers';
import {routerActions} from 'react-router-redux';
import {GetFormValues} from '../common/helpers';

const reducerName = 'patientEditForm';
class PatientEdit extends Component{
	componentDidMount(){
		let _this = this;
		this.props.userPatientApiDetail(this.props.patientAuth.email);
		$('#birthday').datepicker({
			format: 'dd/mm/yyyy',
			startView: 2
		})
		.on('changeDate', function(event){
			const date = moment(event.date).format('YYYY-MM-DD');
			_this.props.userPatientEditChangeField('birthday', date);
		});

		$('#birthday').val(DisplayDate(this.props.patientEditForm.birthday.value));
	}
	componentDidUpdate(){
		$('#birthday').val(DisplayDate(this.props.patientEditForm.birthday.value));	
	}
	_goToEdit(){
		this.props.push('/auth/client/edit');
	}
	_onValidation(field, value){
		let errors = [];
		switch(field){
			case 'name':
				if(is.empty(value))
					errors.push({error: 'Name Required', field});
				else if(value.length < 4)
					errors.push({error: 'Name Must Be Larger Than 4 Characters', field});
				break;
		}
		return errors;
	}
	_onChangeField(field, event){
		const value = event.target.value;
		this.props.userPatientEditChangeField(field, value);
		this._onValidationChange(field, value);
	}
	_onFocusField(){
		const {touched} = this.props[reducerName];
		if(!touched)
			this.props.userPatientEditFocusField();
	}
	_onSubmit(event){
		event.preventDefault();
		if(!this.props[reducerName].submitting){
			this.props.userPatientEditFocusField();
			this._onValidationChange('name', this.props[reducerName].name);
		}else{
			const values = GetFormValues(this.props[reducerName]);
			this.props.userPatientEditSubmit(values);
		}
		return false;
	}
	_onValidationChange(field, value){
		const errors = this._onValidation(field, value);
		this.props.userPatientEditValidationField(field, errors, reducerName);
	}
	render(){
		const {touched, submitting, name} = this.props[reducerName];
		return (
			<div className="tp-main-container">
				<div className="tp-contact">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h1>Patient Detail</h1>
								<form className="form-horizontal" onSubmit={this._onSubmit.bind(this)} method="POST">
									<div className={(touched && name.error) ? 'form-group required has-error': 'form-group required'}>
										<label className="col-sm-2 control-label"><b>Name</b></label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="name" name="name" value={this.props.patientEditForm.name.value}
												onChange={this._onChangeField.bind(this, 'name')}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, 'name')}/>
											{touched && name.error && <small className="text-danger">{name.error}</small>}
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label"><b>Birthday</b></label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="birthday" name="birthday"/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label"><b>Phone</b></label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="phone" name="phone" value={this.props.patientEditForm.phone.value}
												onChange={this._onChangeField.bind(this, 'phone')}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, 'phone')}/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label"><b>Address</b></label>
										<div className="col-sm-10">
											<input type="text" className="form-control" id="address" name="address" value={this.props.patientEditForm.address.value}
												onChange={this._onChangeField.bind(this, 'address')}
												onFocus={this._onFocusField.bind(this)}
												onBlur={this._onChangeField.bind(this, 'address')}/>
										</div>
									</div>
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10"><button className="btn btn-primary" type="submit">Edit Patient</button></div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = ({patientEditForm, patientAuth}) => {
	return {patientEditForm, patientAuth};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...UserActions,
		...routerActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientEdit);