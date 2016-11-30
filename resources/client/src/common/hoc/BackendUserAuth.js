import React, {Component} from 'react';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import {bindActionCreators} from 'redux';

import Routes from '../../common/config/routes';

const Auth = ComposedComponent => {
    class Authentication extends Component{
    	componentWillMount(){
    		this._checkBeforeGoRoute();
    	}
    	componentWillUpdate(){
            this._checkBeforeGoRoute();
    	}
        _checkBeforeGoRoute(){
            if(this.props.route.path === Routes.backend.signin){
                if(this.props.userAuth.role == 'admin')
                    this.props.push(Routes.backend.dashboard);
            }else{
                if(this.props.userAuth.role != 'admin'){
                    this.props.push(Routes.backend.signin);
                }
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