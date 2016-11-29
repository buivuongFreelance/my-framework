import React, {Component} from 'react';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import {bindActionCreators} from 'redux';

const Auth = ComposedComponent => {
    class Authentication extends Component{
    	componentWillMount(){
    		this._checkBeforeGoRoute();
    	}
    	componentWillUpdate(){
            this._checkBeforeGoRoute();
    	}
        _checkBeforeGoRoute(){
            if(this.props.route.path === 'signin' || this.props.route.path === 'signup'){
                if(this.props.userAuth.email)
                    this.props.push('/auth/user/dashboard');
            }else{
                if(!this.props.userAuth.email)
                    this.props.push('/auth/user/signin');
            }
        }
		render(){
			return <ComposedComponent {...this.props}/>
		};
    };

    const mapStateToProps = ({userAuth}) => {
		return {userAuth};
	};

	const mapDispatchToProps = (dispatch) => {
		return bindActionCreators({
			...routerActions,
		}, dispatch);
	};

	return connect(mapStateToProps, mapDispatchToProps)(Authentication);
};

export default Auth;