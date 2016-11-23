import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware, push} from 'react-router-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import loggerMiddleware from '../common/middlewares/logger';

const routingMiddleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, loggerMiddleware, routingMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);

import routes from './routes';

/*import LoginComponent from './components/auth/login';*/
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{routes}
		</Router>
	</Provider>
, document.getElementById('app'));