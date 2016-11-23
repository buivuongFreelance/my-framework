import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware, push} from 'react-router-redux';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import RequireAuth from './hoc/require_auth';
import reducers from './reducers';

import loggerMiddleware from './middlewares/logger';

const routingMiddleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, loggerMiddleware, routingMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);

const token = localStorage.getItem('token');
if(token){
	//update application state
	store.dispatch({type: AUTH_USER});
}

import DesignList from './components/design/list';
import DesignDetail from './components/design/detail';
import LoginComponent from './components/auth/login';

ReactDOM.render(
  <Provider store={store}>
 	  <Router history={history}>
  		<Route path="/primaCare/public" component={App}>
        <Route path="admin">
          <Route path="auth">
            <Route path="login" component={LoginComponent}/>
          </Route>
        </Route>
        <Route path="design/list" component={DesignList}/>
        <Route path="design/detail" component={DesignDetail}/>
  		</Route>
  	</Router>
  </Provider>
  , document.getElementById('app'));