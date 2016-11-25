import React, {Component} from 'react';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import {bindActionCreators} from 'redux';

const Auth = ComposedComponent => {
    class Authentication extends Component{
    	/*componentWillMount(){
    		if(this.props.route.path === 'login' || this.props.route.path === 'registration'){
    			if(this.props.patientAuth.authenticate)
    				this.props.push('/auth/client/dashboard');
    		}else{
    			if(!this.props.patientAuth.authenticate)
    				this.props.push('/auth/client/login');
    		}
    	}
    	componentWillUpdate(){
            console.log(this.props.patientAuth);
    		if(this.props.route.path === 'login' || this.props.route.path === 'registration'){
    			if(this.props.patientAuth.authenticate)
    				this.props.push('/auth/client/dashboard');
    		}else{
    			if(!this.props.patientAuth.authenticate)
    				this.props.push('/auth/client/login');
    		}
    	}
        componentDidUpdate(){
            console.log('did');
            if(this.props.route.path === 'login' || this.props.route.path === 'registration'){
                if(this.props.patientAuth.authenticate)
                    this.props.push('/auth/client/dashboard');
            }else{
                if(!this.props.patientAuth.authenticate)
                    this.props.push('/auth/client/login');
            }
        }*/
		render(){
			return <ComposedComponent {...this.props}/>
		};
    };

    const mapStateToProps = ({patientAuth}) => {
		return {patientAuth};
	};

	const mapDispatchToProps = (dispatch) => {
		return bindActionCreators({
			...routerActions,
		}, dispatch);
	};

	return connect(mapStateToProps, mapDispatchToProps)(Authentication);
};

export default Auth;