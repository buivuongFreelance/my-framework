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
import {DEFAULT_URL} from '../common/config';

const customHistory = useRouterHistory(createHistory)({
	basename: DEFAULT_URL
});

const routingMiddleware = routerMiddleware(customHistory);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, loggerMiddleware, routingMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(customHistory, store);

import routes from './routes';

/*import LoginComponent from './components/auth/login';*/
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{routes}
		</Router>
	</Provider>
, document.getElementById('app'));