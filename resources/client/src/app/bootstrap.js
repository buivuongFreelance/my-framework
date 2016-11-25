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
import {USER_PATIENT_AUTH_LOGIN} from '../user/types';

import {IntlProvider} from 'react-intl-redux';
import enLocaleData from 'react-intl/locale-data/en';
import {addLocaleData} from 'react-intl';
import currentLang from '../lang/en';

const customHistory = useRouterHistory(createHistory)({
	basename: DEFAULT_URL
});

addLocaleData([
	...enLocaleData
]);

const routingMiddleware = routerMiddleware(customHistory);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, loggerMiddleware, routingMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, currentLang);
const history = syncHistoryWithStore(customHistory, store);

const token = localStorage.getItem('patient_token');
if(token){
	const email = localStorage.getItem('email');
	const name = localStorage.getItem('name');

	store.dispatch({type: USER_PATIENT_AUTH_LOGIN, payload: {email, name, authenticate: true} });
}

import routes from './routes';

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider>
			<Router history={history}>
				{routes}
			</Router>
		</IntlProvider>
	</Provider>
, document.getElementById('app'));