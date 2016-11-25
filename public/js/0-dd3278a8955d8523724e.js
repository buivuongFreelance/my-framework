webpackJsonp([0,2],{

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(16);

var _redux = __webpack_require__(17);

var _user = __webpack_require__(40);

var _helpers = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reducerName = 'patientRegistrationForm';

var PatientRegistration = function (_Component) {
	_inherits(PatientRegistration, _Component);

	function PatientRegistration() {
		_classCallCheck(this, PatientRegistration);

		return _possibleConstructorReturn(this, (PatientRegistration.__proto__ || Object.getPrototypeOf(PatientRegistration)).apply(this, arguments));
	}

	_createClass(PatientRegistration, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this = this;
			$('#birthday').datepicker({
				format: 'mm/dd/yyyy',
				startView: 2
			}).on('changeDate', function (event) {
				var date = moment(event.date).format('YYYY-MM-DD');
				_this.props.userPatientRegistrationChangeField('birthday', date);
			});
		}
	}, {
		key: '_onValidation',
		value: function _onValidation(field, value) {
			var errors = [];
			switch (field) {
				case 'name':
					if (is.empty(value)) errors.push({ error: 'Required', field: field });else if (value.length < 4) errors.push({ error: 'Must Be Larger Than 4 Characters', field: field });
					break;
				case 'email':
					if (is.empty(value)) errors.push({ error: 'Email Address Required', field: field });else if (!is.email(value)) errors.push({ error: 'Email Address Must Be Correct !!!!', field: field });
					break;
				case 'password':
					if (is.empty(value)) errors.push({ error: 'Password Required', field: field });else if (value.length < 6) errors.push({ error: 'Password Must At Least 6 Characters', field: field });else if (this.props[reducerName].rePassword.value !== value) {
						errors.push({ error: '', field: field });
						errors.push({ error: 'Must Be The Same With Password', field: 'rePassword' });
					} else {
						errors.push({ error: '', field: field });
						errors.push({ error: '', field: 'rePassword' });
					}
					break;
				case 'rePassword':
					if (is.empty(value)) errors.push({ error: 'Password Re-Typed Required', field: field });else if (this.props[reducerName].password.value !== value) {
						errors.push({ error: 'Must Be The Same With Password', field: field });
					}
					break;
			}
			return errors;
		}
	}, {
		key: '_onChangeField',
		value: function _onChangeField(field, event) {
			var value = event.target.value;
			this.props.userPatientRegistrationChangeField(field, value);
			this._onValidationChange(field, value);
		}
	}, {
		key: '_onFocusField',
		value: function _onFocusField() {
			var touched = this.props[reducerName].touched;

			if (!touched) this.props.userPatientRegistrationFocusField();
		}
	}, {
		key: '_onSubmit',
		value: function _onSubmit(event) {
			event.preventDefault();
			if (!this.props[reducerName].submitting) {
				this.props.userPatientRegistrationFocusField();
				this._onValidationChange('name', this.props[reducerName].name.value);
				this._onValidationChange('email', this.props[reducerName].email.value);
				this._onValidationChange('password', this.props[reducerName].password.value);
			} else {
				var values = (0, _helpers.GetFormValues)(this.props[reducerName]);
				this.props.userPatientRegistrationSubmit(values);
			}
		}
	}, {
		key: '_onValidationChange',
		value: function _onValidationChange(field, value) {
			var errors = this._onValidation(field, value);
			this.props.userPatientRegistrationValidationField(field, errors, reducerName);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props$reducerName = this.props[reducerName],
			    touched = _props$reducerName.touched,
			    submitting = _props$reducerName.submitting,
			    name = _props$reducerName.name,
			    email = _props$reducerName.email,
			    password = _props$reducerName.password,
			    rePassword = _props$reducerName.rePassword;


			return _react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-md-12' },
						_react2.default.createElement(
							'div',
							{ className: 'portlet box green login' },
							_react2.default.createElement(
								'div',
								{ className: 'portlet-title' },
								_react2.default.createElement(
									'div',
									{ className: 'caption' },
									_react2.default.createElement('i', { className: 'fa fa-user' }),
									' User'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'portlet-body form' },
								_react2.default.createElement(
									'form',
									{ className: 'form-horizontal', noValidation: true, method: 'POST' },
									_react2.default.createElement(
										'div',
										{ className: 'form-body' },
										_react2.default.createElement(
											'div',
											{ className: 'row' },
											_react2.default.createElement(
												'div',
												{ className: 'col-md-12' },
												_react2.default.createElement(
													'div',
													{ className: 'form-group' },
													_react2.default.createElement(
														'label',
														{ className: 'control-label col-md-3' },
														'Email Address'
													),
													_react2.default.createElement(
														'div',
														{ className: 'col-md-9' },
														_react2.default.createElement('input', { type: 'email', className: 'form-control', placeholder: 'Email Address' })
													)
												)
											)
										),
										_react2.default.createElement(
											'div',
											{ className: 'row' },
											_react2.default.createElement(
												'div',
												{ className: 'col-md-12' },
												_react2.default.createElement(
													'div',
													{ className: 'form-group' },
													_react2.default.createElement(
														'label',
														{ className: 'control-label col-md-3' },
														'Password'
													),
													_react2.default.createElement(
														'div',
														{ className: 'col-md-9' },
														_react2.default.createElement('input', { type: 'password', className: 'form-control', placeholder: 'Password' })
													)
												)
											)
										)
									),
									_react2.default.createElement(
										'div',
										{ className: 'form-actions fluid' },
										_react2.default.createElement(
											'div',
											{ className: 'row' },
											_react2.default.createElement(
												'div',
												{ className: 'col-md-12' },
												_react2.default.createElement(
													'div',
													{ className: 'row' },
													_react2.default.createElement(
														'div',
														{ className: 'col-md-4' },
														_react2.default.createElement(
															'button',
															{ type: 'submit', className: 'btn green uppercase' },
															'Login User'
														)
													),
													_react2.default.createElement(
														'div',
														{ className: 'col-md-4' },
														_react2.default.createElement(
															'a',
															{ href: 'javascript:;', className: 'forget-password' },
															'Create New User?'
														)
													),
													_react2.default.createElement(
														'div',
														{ className: 'col-md-4' },
														_react2.default.createElement(
															'a',
															{ href: 'javascript:;', className: 'forget-password' },
															'Forgot Password?'
														)
													)
												)
											)
										)
									)
								)
							)
						)
					)
				)
			);

			/*return (
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
   );*/
		}
	}]);

	return PatientRegistration;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(_ref) {
	var patientRegistrationForm = _ref.patientRegistrationForm;

	return { patientRegistrationForm: patientRegistrationForm };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)(_extends({}, _user.UserActions), dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PatientRegistration);

/***/ }

});