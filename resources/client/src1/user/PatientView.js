import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UserActions} from '../user';
import {DisplayDate} from '../common/helpers';
import {ThemeActions} from '../theme';

class PatientView extends Component{
	componentDidMount(){
		this.props.userPatientApiDetail(this.props.patientAuth.email);
	}
	_goToEdit(){
		this.props.themeClickClientEdit();
	}
	render(){
		return (
			<div className="tp-main-container">
				<div className="tp-contact">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h1>Patient Detail</h1>
								<form className="form-horizontal">
									<div className="form-group">
										<label className="col-sm-2 control-label"><b>Name</b></label>
										<div className="col-sm-10">
											<p className="form-control-static">{this.props.patient.name}</p>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label"><b>Email</b></label>
										<div className="col-sm-10">
											<p className="form-control-static">{this.props.patient.email}</p>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label"><b>Phone</b></label>
										<div className="col-sm-10">
											<p className="form-control-static">{this.props.patient.client.phone}</p>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label"><b>Address</b></label>
										<div className="col-sm-10">
											<p className="form-control-static">{this.props.patient.client.address}</p>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label"><b>Birthday</b></label>
										<div className="col-sm-10">
											<p className="form-control-static">{DisplayDate(this.props.patient.client.birthday)}</p>
										</div>
									</div>
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10"><button type="button" className="btn btn-primary" onClick={this._goToEdit.bind(this)}>Edit</button></div>
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

const mapStateToProps = ({patient, patientAuth}) => {
	return {patient, patientAuth};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...UserActions,
		...ThemeActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientView);