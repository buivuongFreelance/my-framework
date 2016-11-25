import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import scriptLoader from 'react-async-script-loader';

class UserSignIn extends Component{
	/*componentDidMount(){
		toastr.success('Successful Login For Server', 'Notifications', {timeOut: 100000});
		toastr.error('Error Login For Server', 'Notifications', {timeOut: 100000});
	}*/
	componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }){
    	if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished 
	    	if (isScriptLoadSucceed) {
	    		this.initEditor();
	    	}
	    	else this.props.onError();
    	}
  	}

  	componentDidMount(){
  		console.log('sasss');
    	const {isScriptLoaded, isScriptLoadSucceed} = this.props
    	if (isScriptLoaded && isScriptLoadSucceed){
      		this.initEditor();
    	}
  	}
	render(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="portlet box green login">
							<div className="portlet-title">
								<div className="caption">
									<i className="fa fa-user"/> <FormattedMessage id="page.user.login.title"/>
								</div>
							</div>
							<div className="portlet-body form">
								<form className="form-horizontal" noValidation method="POST">
									<div className="form-body">
										<div className="row">
											<div className="col-md-12">
												<div className="form-group has-error">
													<label className="control-label col-md-3">
														Email Address
													</label>
													<div className="col-md-9">
														<input type="email" className="form-control" placeholder="Email Address"/>
														<span className="help-block">Email Address has error.</span>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label className="control-label col-md-3">
														Password
													</label>
													<div className="col-md-9">
														<input type="password" className="form-control" placeholder="Password"/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="form-actions fluid">
										<div className="row">
											<div className="col-md-12">
												<div className="row">
													<div className="col-md-4">
														<button type="submit" className="btn green uppercase">Login User</button>
													</div>
													<div className="col-md-4">
														<a href="javascript:;" className="forget-password">Create New User?</a>
		                        					</div>
		                        					<div className="col-md-4">
                    									<a href="javascript:;" className="forget-password">Forgot Password?</a>
                    								</div>
												</div>
											</div>
										</div>
									</div>
									
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default scriptLoader([
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js'
  ],
  '/assets/bootstrap-markdown.js')(UserSignIn);