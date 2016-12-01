import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, browserHistory, useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import {syncHistoryWithStore, routerMiddleware, push} from 'react-router-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import loggerMiddleware from '../common/middlewares/logger';
import {DEFAULT_URL, API_URL} from '../common/config';

import axios from 'axios';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const customHistory = useRouterHistory(createHistory)({
	basename: DEFAULT_URL
});

const routingMiddleware = routerMiddleware(customHistory);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, routingMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(customHistory, store);

import {userAuthSignIn} from '../user/actions/auth';

const token = localStorage.getItem('token');
if(token){
	const user = JSON.parse(localStorage.getItem('user'));
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	store.dispatch(userAuthSignIn(user));
}

import routes from './routes';

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{routes}
		</Router>
	</Provider>
, document.getElementById('app'));